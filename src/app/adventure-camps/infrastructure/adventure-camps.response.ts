import { BaseResponse } from '../../shared/infrastructure/base-response';
import { AdventureCampResource } from './adventure-camp.resource';

/**
 * Collection of adventure camps.
 *
 * @summary Response envelope of the /adventure-camps endpoint; json-server returns the bare array, which the base endpoint handles directly.
 * @author Gerardo Palacin
 */
export interface AdventureCampsResponse extends BaseResponse {
  adventureCamps: AdventureCampResource[];
}
