import { BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Current conditions reported by Open-Meteo.
 *
 * @summary Resource nested in the forecast response.
 * @author Gerardo Palacin
 */
export interface CurrentWeatherResource {
  /** Time of the measurement. */
  time?: string;
  /** Air temperature at 2 meters above ground, in degrees Celsius. */
  temperature_2m: number;
}

/**
 * Forecast response returned by Open-Meteo.
 *
 * @summary Response of the Request/Response pattern for the weather provider.
 * @author Gerardo Palacin
 */
export interface WeatherForecastResponse extends BaseResponse {
  /** Latitude of the grid cell used by the provider. */
  latitude?: number;
  /** Longitude of the grid cell used by the provider. */
  longitude?: number;
  /** Current conditions. */
  current?: CurrentWeatherResource;
}
