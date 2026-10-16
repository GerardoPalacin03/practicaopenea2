import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseEntity } from '../domain/model/base-entity';
import { BaseAssembler } from './base-assembler';
import { BaseResource, BaseResponse } from './base-response';

/**
 * Generic read and create operations for a single REST endpoint.
 *
 * @summary Reusable endpoint class that maps resources to entities through an assembler.
 * @author Gerardo Palacin
 *
 * @typeParam TEntity - Domain entity handled by the endpoint.
 * @typeParam TResource - Resource exchanged with the API.
 * @typeParam TResponse - Response envelope returned by collection queries.
 * @typeParam TAssembler - Mapper between resources and entities.
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> {
  /**
   * @param http - HTTP client used for the requests.
   * @param endpointUrl - Complete URL of the endpoint.
   * @param assembler - Assembler that converts resources into entities.
   */
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly endpointUrl: string,
    protected readonly assembler: TAssembler
  ) {}

  /**
   * Fetches the entities of the endpoint, optionally filtered by query parameters.
   * @param params - Query parameters used to filter the collection.
   * @returns Stream with the mapped entities.
   */
  getAll(params: Record<string, string | number> = {}): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl, { params }).pipe(
      map((response) =>
        Array.isArray(response)
          ? response.map((resource) => this.assembler.toEntityFromResource(resource))
          : this.assembler.toEntitiesFromResponse(response as TResponse)
      ),
      catchError(this.handleError('Failed to fetch data'))
    );
  }

  /**
   * Fetches one entity by identifier.
   * @param id - Entity identifier.
   * @returns Stream with the mapped entity.
   */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map((resource) => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch the record'))
    );
  }

  /**
   * Creates a record from a request object; the server generates the identifier.
   * @param request - Data sent to the API, without identifier.
   * @returns Stream with the entity created by the API.
   */
  create(request: object): Observable<TEntity> {
    return this.http.post<TResource>(this.endpointUrl, request).pipe(
      map((resource) => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to save the record'))
    );
  }

  /**
   * Builds an HTTP error handler for an operation.
   * @param operation - Description of the failed operation.
   * @returns Function that turns an HTTP error into a failed stream.
   */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      const reason = error.status === 404 ? 'Resource not found' : error.statusText || 'Server not reachable';
      return throwError(() => new Error(`${operation}: ${reason}`));
    };
  }
}
