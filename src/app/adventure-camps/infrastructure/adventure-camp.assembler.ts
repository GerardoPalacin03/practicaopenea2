import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { AdventureCamp } from '../domain/model/adventure-camp.entity';
import { AdventureCampResource } from './adventure-camp.resource';
import { AdventureCampsResponse } from './adventure-camps.response';

/**
 * Converts adventure camp resources into entities.
 *
 * @summary Assembler that owns the mapping of the camp attributes.
 * @author Gerardo Palacin
 */
export class AdventureCampAssembler implements BaseAssembler<AdventureCamp, AdventureCampResource, AdventureCampsResponse> {
  toEntityFromResource(resource: AdventureCampResource): AdventureCamp {
    return new AdventureCamp(
      resource.id,
      resource.name,
      resource.activityType,
      resource.capacity,
      resource.latitude,
      resource.longitude
    );
  }

  toEntitiesFromResponse(response: AdventureCampsResponse): AdventureCamp[] {
    return response.adventureCamps.map((resource) => this.toEntityFromResource(resource));
  }
}
