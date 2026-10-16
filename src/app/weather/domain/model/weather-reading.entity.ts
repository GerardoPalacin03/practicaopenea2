/**
 * Current weather measured at a location.
 *
 * @summary Domain entity of the weather sub-domain; it is a read-only value reported by the weather provider, so it has no identifier.
 * @author Gerardo Palacin
 */
export class WeatherReading {
  /** Latitude of the location. */
  readonly #latitude: number;
  /** Longitude of the location. */
  readonly #longitude: number;
  /** Current temperature in degrees Celsius. */
  readonly #temperature: number;

  /**
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   * @param temperature - Current temperature in degrees Celsius.
   */
  constructor(latitude: number, longitude: number, temperature: number) {
    this.#latitude = latitude;
    this.#longitude = longitude;
    this.#temperature = temperature;
  }

  /** Latitude of the location. */
  get latitude(): number {
    return this.#latitude;
  }

  /** Longitude of the location. */
  get longitude(): number {
    return this.#longitude;
  }

  /** Current temperature in degrees Celsius. */
  get temperature(): number {
    return this.#temperature;
  }
}
