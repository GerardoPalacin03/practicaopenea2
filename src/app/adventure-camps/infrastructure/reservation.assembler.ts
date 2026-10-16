import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Reservation } from '../domain/model/reservation.entity';
import { ReservationResource } from './reservation.resource';
import { ReservationsResponse } from './reservations.response';

/**
 * Converts reservation resources into entities.
 *
 * @summary Assembler that owns the mapping of the reservation attributes, including the date.
 * @author Gerardo Palacin
 */
export class ReservationAssembler implements BaseAssembler<Reservation, ReservationResource, ReservationsResponse> {
  toEntityFromResource(resource: ReservationResource): Reservation {
    return new Reservation(
      resource.id,
      resource.adventureCampId,
      resource.activityType,
      resource.participantName,
      resource.participants,
      resource.weatherTemperature,
      new Date(resource.reservedAt)
    );
  }

  toEntitiesFromResponse(response: ReservationsResponse): Reservation[] {
    return response.reservations.map((resource) => this.toEntityFromResource(resource));
  }
}
