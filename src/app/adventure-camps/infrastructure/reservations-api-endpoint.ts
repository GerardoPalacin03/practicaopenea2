import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Reservation } from '../domain/model/reservation.entity';
import { ReservationAssembler } from './reservation.assembler';
import { ReservationResource } from './reservation.resource';
import { ReservationsResponse } from './reservations.response';

/**
 * Endpoint of the reservations.
 *
 * @summary Read and create operations over the /reservations resource of the fake API.
 * @author Gerardo Palacin
 */
export class ReservationsApiEndpoint extends BaseApiEndpoint<
  Reservation,
  ReservationResource,
  ReservationsResponse,
  ReservationAssembler
> {
  /**
   * @param http - HTTP client used for the requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderReservationsEndpointPath}`,
      new ReservationAssembler()
    );
  }
}
