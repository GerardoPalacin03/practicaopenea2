import { BaseResource } from '../../shared/infrastructure/base-response';
import { ActivityType } from '../domain/model/activity-type.enum';

/**
 * Reservation as exposed by the fake API.
 *
 * @summary Resource of the /reservations endpoint.
 * @author Gerardo Palacin
 */
export interface ReservationResource extends BaseResource {
  adventureCampId: number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}
