import { BaseResource } from '../../shared/infrastructure/base-response';
import { ActivityType } from '../domain/model/activity-type.enum';

/**
 * Adventure camp as exposed by the fake API.
 *
 * @summary Resource of the /adventure-camps endpoint.
 * @author Gerardo Palacin
 */
export interface AdventureCampResource extends BaseResource {
  name: string;
  activityType: ActivityType;
  capacity: number;
  latitude: number;
  longitude: number;
}
