import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { ActivityType } from './activity-type.enum';

/**
 * Adventure camp where participants are registered.
 *
 * @summary Domain entity with the identity, activity, capacity and location of a camp.
 * @author Gerardo Palacin
 */
export class AdventureCamp implements BaseEntity {
  readonly #id: number;
  readonly #name: string;
  readonly #activityType: ActivityType;
  readonly #capacity: number;
  readonly #latitude: number;
  readonly #longitude: number;

  /**
   * @param id - Unique identifier of the camp.
   * @param name - Name of the camp.
   * @param activityType - Activity offered by the camp.
   * @param capacity - Maximum number of participants.
   * @param latitude - Latitude of the camp.
   * @param longitude - Longitude of the camp.
   */
  constructor(id: number, name: string, activityType: ActivityType, capacity: number, latitude: number, longitude: number) {
    this.#id = id;
    this.#name = name;
    this.#activityType = activityType;
    this.#capacity = capacity;
    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  /** Unique identifier of the camp. */
  get id(): number {
    return this.#id;
  }

  /** Name of the camp. */
  get name(): string {
    return this.#name;
  }

  /** Activity offered by the camp. */
  get activityType(): ActivityType {
    return this.#activityType;
  }

  /** Maximum number of participants. */
  get capacity(): number {
    return this.#capacity;
  }

  /** Latitude of the camp. */
  get latitude(): number {
    return this.#latitude;
  }

  /** Longitude of the camp. */
  get longitude(): number {
    return this.#longitude;
  }
}
