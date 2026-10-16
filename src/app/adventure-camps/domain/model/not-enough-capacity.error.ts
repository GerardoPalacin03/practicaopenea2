/**
 * Error raised when a reservation asks for more participants than the camp can still hold.
 *
 * @summary Domain error that carries the capacity that was really available.
 * @author Gerardo Palacin
 */
export class NotEnoughCapacityError extends Error {
  /**
   * @param available - Capacity still available in the camp.
   */
  constructor(readonly available: number) {
    super(`Not enough capacity: only ${available} spots available`);
    this.name = 'NotEnoughCapacityError';
  }
}
