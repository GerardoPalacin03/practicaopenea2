import { WeatherReading } from '../domain/model/weather-reading.entity';
import { WeatherForecastRequest } from './weather-forecast.request';
import { WeatherForecastResponse } from './weather-forecast.response';

/**
 * Converts the weather provider response into the domain entity.
 *
 * @summary Assembler of the weather sub-domain; it owns the mapping from the provider attributes to the entity attributes.
 * @author Gerardo Palacin
 */
export class WeatherReadingAssembler {
  /**
   * Builds a weather reading from the forecast response.
   * @param response - Response returned by Open-Meteo.
   * @param request - Request that produced the response, used for the coordinates.
   * @returns The weather reading.
   * @throws Error when the response has no valid current temperature.
   */
  toEntityFromResponse(response: WeatherForecastResponse, request: WeatherForecastRequest): WeatherReading {
    const temperature = response?.current?.temperature_2m;
    if (typeof temperature !== 'number' || Number.isNaN(temperature)) {
      throw new Error('The weather provider returned no temperature');
    }
    return new WeatherReading(request.latitude, request.longitude, temperature);
  }
}
