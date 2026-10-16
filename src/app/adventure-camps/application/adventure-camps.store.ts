import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, forkJoin, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AdventureCampSummary } from '../domain/model/adventure-camp-summary.model';
import { AdventureCamp } from '../domain/model/adventure-camp.entity';
import { NotEnoughCapacityError } from '../domain/model/not-enough-capacity.error';
import { Reservation } from '../domain/model/reservation.entity';
import { AdventureCampsApi } from '../infrastructure/adventure-camps-api';
import { CreateReservationRequest } from '../infrastructure/create-reservation.request';

/**
 * State of the adventure camps and their reservations.
 *
 * @summary Signal store that loads camps and reservations, derives the summary of each camp and creates reservations after rechecking the capacity.
 * @author Gerardo Palacin
 */
@Injectable({ providedIn: 'root' })
export class AdventureCampsStore {
  readonly #api = inject(AdventureCampsApi);
  readonly #destroyRef = inject(DestroyRef);

  readonly #camps = signal<AdventureCamp[]>([]);
  readonly #reservations = signal<Reservation[]>([]);
  readonly #loading = signal(false);
  readonly #error = signal<string | null>(null);

  /** Adventure camps loaded from the API. */
  readonly camps = this.#camps.asReadonly();
  /** Reservations loaded from the API. */
  readonly reservations = this.#reservations.asReadonly();
  /** Whether camps and reservations are being loaded. */
  readonly loading = this.#loading.asReadonly();
  /** Message of the last loading failure, or null. */
  readonly error = this.#error.asReadonly();
  /** Summary of every camp: reservations, total participants and available capacity. */
  readonly summaries = computed(() =>
    this.#camps().map((camp) => new AdventureCampSummary(camp, this.#reservations()))
  );

  /** Loads camps and reservations, replacing the current state. */
  loadAll(): void {
    this.#loading.set(true);
    this.#error.set(null);
    forkJoin([this.#api.getAdventureCamps(), this.#api.getReservations()])
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: ([camps, reservations]) => {
          this.#camps.set(camps);
          this.#reservations.set(reservations);
          this.#loading.set(false);
        },
        error: (error: Error) => {
          this.#error.set(error.message);
          this.#loading.set(false);
        }
      });
  }

  /**
   * Creates a reservation after querying the camp and its reservations again and recomputing the available capacity.
   * @param request - Data of the reservation; it carries no identifier.
   * @returns Stream with the created reservation; it fails with NotEnoughCapacityError when the camp cannot hold the participants.
   */
  createReservation(request: CreateReservationRequest): Observable<Reservation> {
    return forkJoin([
      this.#api.getAdventureCampById(request.adventureCampId),
      this.#api.getReservationsByCamp(request.adventureCampId)
    ]).pipe(
      switchMap(([camp, current]) => {
        this.#reservations.update((all) => [
          ...all.filter((reservation) => reservation.adventureCampId !== camp.id),
          ...current
        ]);
        const available = new AdventureCampSummary(camp, current).availableCapacity;
        if (request.participants > available) {
          return throwError(() => new NotEnoughCapacityError(available));
        }
        return this.#api.createReservation(request);
      }),
      tap((reservation) => this.#reservations.update((all) => [...all, reservation]))
    );
  }
}
