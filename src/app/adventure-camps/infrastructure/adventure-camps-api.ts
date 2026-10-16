import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { AdventureCamp } from '../domain/model/adventure-camp.entity';
import { Reservation } from '../domain/model/reservation.entity';
import { AdventureCampsApiEndpoint } from './adventure-camps-api-endpoint';
import { CreateReservationRequest } from './create-reservation.request';
import { ReservationsApiEndpoint } from './reservations-api-endpoint';

/**
 * Facade of the platform API for the adventure camps sub-domain.
 *
 * @summary Composes the camps and reservations endpoints and exposes domain-oriented operations.
 * @author Gerardo Palacin
 */
@Injectable({ providedIn: 'root' })
export class AdventureCampsApi extends BaseApi {
  readonly #campsEndpoint: AdventureCampsApiEndpoint;
  readonly #reservationsEndpoint: ReservationsApiEndpoint;

  constructor() {
    super();
    const http = inject(HttpClient);
    this.#campsEndpoint = new AdventureCampsApiEndpoint(http);
    this.#reservationsEndpoint = new ReservationsApiEndpoint(http);
  }

  /** Gets every adventure camp. */
  getAdventureCamps(): Observable<AdventureCamp[]> {
    return this.#campsEndpoint.getAll();
  }

  /**
   * Gets one adventure camp.
   * @param id - Identifier of the camp.
   */
  getAdventureCampById(id: number): Observable<AdventureCamp> {
    return this.#campsEndpoint.getById(id);
  }

  /** Gets every reservation. */
  getReservations(): Observable<Reservation[]> {
    return this.#reservationsEndpoint.getAll();
  }

  /**
   * Gets the reservations of one camp.
   * @param adventureCampId - Identifier of the camp.
   */
  getReservationsByCamp(adventureCampId: number): Observable<Reservation[]> {
    return this.#reservationsEndpoint.getAll({ adventureCampId });
  }

  /**
   * Creates a reservation; the server generates its identifier.
   * @param request - Data of the reservation.
   */
  createReservation(request: CreateReservationRequest): Observable<Reservation> {
    return this.#reservationsEndpoint.create(request);
  }
}
