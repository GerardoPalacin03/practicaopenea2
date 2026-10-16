import { ActivityType } from '../domain/model/activity-type.enum';

/**
 * Data sent to create a reservation.
 *
 * @summary Request of the Request/Response pattern; it has no id because JSON Server generates it.
 * @author Gerardo Palacin
 */
export interface CreateReservationRequest {
  adventureCampId: number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  /** Date and time in ISO 8601 format. */
  reservedAt: string;
}
