import { BaseResponse } from '../../shared/infrastructure/base-response';
import { ReservationResource } from './reservation.resource';

/**
 * Collection of reservations.
 *
 * @summary Response envelope of the /reservations endpoint; json-server returns the bare array, which the base endpoint handles directly.
 * @author Gerardo Palacin
 */
export interface ReservationsResponse extends BaseResponse {
  reservations: ReservationResource[];
}
