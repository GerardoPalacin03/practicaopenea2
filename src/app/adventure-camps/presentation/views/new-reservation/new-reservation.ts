import { Component, DestroyRef, Signal, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { WeatherStore } from '../../../../weather/application/weather.store';
import { WeatherTemperature } from '../../../../weather/presentation/components/weather-temperature/weather-temperature';
import { AdventureCampsStore } from '../../../application/adventure-camps.store';
import { ActivityType } from '../../../domain/model/activity-type.enum';
import { NotEnoughCapacityError } from '../../../domain/model/not-enough-capacity.error';
import { CreateReservationRequest } from '../../../infrastructure/create-reservation.request';
import { notBlank, wholeNumber, withinCapacity } from './new-reservation.validators';

/**
 * New Reservation view.
 *
 * @summary Reactive form reachable at /reservations/new that registers participants in a camp, queries the temperature of the selected camp and saves the reservation.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-new-reservation',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslatePipe,
    WeatherTemperature
  ],
  templateUrl: './new-reservation.html',
  styleUrl: './new-reservation.css'
})
export class NewReservation {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly store = inject(AdventureCampsStore);
  protected readonly weatherStore = inject(WeatherStore);

  /** Whether the reservation is being saved. */
  protected readonly saving = signal(false);
  /** Translation key (and parameters) of the error shown when saving fails. */
  protected readonly submitError = signal<{ key: string; params?: object } | null>(null);

  /** Activity currently selected. */
  protected readonly selectedActivity = signal<ActivityType | null>(null);
  /** Activities offered by the loaded camps. */
  protected readonly activityTypes = computed(() => this.store.camps().map((camp) => camp.activityType));
  /** Summary of the camp of the selected activity. */
  protected readonly selectedSummary = computed(
    () => this.store.summaries().find((summary) => summary.camp.activityType === this.selectedActivity()) ?? null
  );
  /** Available capacity of the selected camp, or null when no activity is selected. */
  protected readonly availableCapacity: Signal<number | null> = computed(() => this.selectedSummary()?.availableCapacity ?? null);

  /** Reactive form of the reservation; it is declared after the signals because the capacity validator reads them. */
  protected readonly form = this.formBuilder.group({
    activityType: this.formBuilder.control<ActivityType | null>(null, Validators.required),
    participantName: this.formBuilder.control('', [Validators.required, notBlank]),
    participants: this.formBuilder.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
      wholeNumber,
      withinCapacity(() => this.availableCapacity())
    ])
  });

  constructor() {
    this.weatherStore.reset();
    this.store.loadAll();
    this.form.controls.activityType.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((activityType) => {
        this.selectedActivity.set(activityType);
        this.loadWeatherOf(activityType);
      });
    // The capacity rule depends on the selected camp, so it is checked again whenever the capacity changes.
    effect(() => {
      this.availableCapacity();
      this.form.controls.participants.updateValueAndValidity();
    });
    this.destroyRef.onDestroy(() => this.weatherStore.reset());
  }

  /**
   * Saves the reservation and goes back to Home when it succeeds; any failure keeps the user on the form.
   */
  protected submit(): void {
    this.form.markAllAsTouched();
    const camp = this.selectedSummary()?.camp;
    const temperature = this.weatherStore.temperature();
    if (this.form.invalid || this.saving() || !camp || temperature === null) {
      return;
    }
    const { participantName, participants } = this.form.getRawValue();
    const request: CreateReservationRequest = {
      adventureCampId: camp.id,
      activityType: camp.activityType,
      participantName: (participantName ?? '').trim(),
      participants: participants as number,
      weatherTemperature: temperature,
      reservedAt: new Date().toISOString()
    };
    this.saving.set(true);
    this.submitError.set(null);
    this.store
      .createReservation(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: (error: Error) => {
          this.saving.set(false);
          this.submitError.set(
            error instanceof NotEnoughCapacityError
              ? { key: 'new-reservation.errors.capacity', params: { available: error.available } }
              : { key: 'new-reservation.errors.save' }
          );
        }
      });
  }

  /**
   * Queries the temperature of the camp that offers the selected activity.
   * @param activityType - Selected activity.
   */
  private loadWeatherOf(activityType: ActivityType | null): void {
    this.submitError.set(null);
    const camp = this.store.camps().find((candidate) => candidate.activityType === activityType);
    if (camp) {
      this.weatherStore.loadCurrentWeather(camp.latitude, camp.longitude);
    } else {
      this.weatherStore.reset();
    }
  }
}
