import { AdventureCamp } from './adventure-camp.entity';
import { Reservation } from './reservation.entity';

/**
 * Reservations and capacity of one camp.
 *
 * @summary Read model that groups the reservations of a camp and computes its total participants and available capacity.
 * @author Gerardo Palacin
 */
export class AdventureCampSummary {
  readonly #camp: AdventureCamp;
  readonly #reservations: Reservation[];

  /**
   * @param camp - Camp being summarized.
   * @param reservations - Reservations of any camp; only those of this camp are kept.
   */
  constructor(camp: AdventureCamp, reservations: Reservation[]) {
    this.#camp = camp;
    this.#reservations = reservations.filter((reservation) => reservation.adventureCampId === camp.id);
  }

  /** Camp being summarized. */
  get camp(): AdventureCamp {
    return this.#camp;
  }

  /** Reservations of the camp. */
  get reservations(): Reservation[] {
    return this.#reservations;
  }

  /** Sum of the participants of all the reservations. */
  get totalParticipants(): number {
    return this.#reservations.reduce((total, reservation) => total + reservation.participants, 0);
  }

  /** Capacity of the camp minus the total participants. */
  get availableCapacity(): number {
    return this.#camp.capacity - this.totalParticipants;
  }
}
