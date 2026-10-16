import { BaseEntity } from '../domain/model/base-entity';
import { BaseResource, BaseResponse } from './base-response';

/**
 * Defines the conversions between API representations and domain entities.
 *
 * @summary Contract of the Assembler pattern; assemblers own the mapping between resource and entity attributes.
 * @author Gerardo Palacin
 *
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - Resource type exchanged with the endpoint.
 * @typeParam TResponse - Response envelope type returned by collection queries.
 */
export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse
> {
  /**
   * Converts a resource into an entity.
   * @param resource - Resource to convert.
   * @returns The converted entity.
   */
  toEntityFromResource(resource: TResource): TEntity;

  /**
   * Converts a response envelope into a collection of entities.
   * @param response - Response returned by the API.
   * @returns The converted entities.
   */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
