import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { AdventureCamp } from '../domain/model/adventure-camp.entity';
import { AdventureCampAssembler } from './adventure-camp.assembler';
import { AdventureCampResource } from './adventure-camp.resource';
import { AdventureCampsResponse } from './adventure-camps.response';

/**
 * Endpoint of the adventure camps.
 *
 * @summary Read operations over the /adventure-camps resource of the fake API.
 * @author Gerardo Palacin
 */
export class AdventureCampsApiEndpoint extends BaseApiEndpoint<
  AdventureCamp,
  AdventureCampResource,
  AdventureCampsResponse,
  AdventureCampAssembler
> {
  /**
   * @param http - HTTP client used for the requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderAdventureCampsEndpointPath}`,
      new AdventureCampAssembler()
    );
  }
}
