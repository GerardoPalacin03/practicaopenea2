/**
 * Data needed to query the forecast of a location.
 *
 * @summary Request of the Request/Response pattern sent to the weather provider.
 * @author Gerardo Palacin
 */
export interface WeatherForecastRequest {
  /** Latitude of the location. */
  latitude: number;
  /** Longitude of the location. */
  longitude: number;
}
