/**
 * Minimal contract implemented by the domain entities of every sub-domain.
 *
 * @summary Declares the unique identifier shared by all entities.
 * @author Gerardo Palacin
 */
export interface BaseEntity {
  /** Unique identifier of the entity. */
  id: number;
}
