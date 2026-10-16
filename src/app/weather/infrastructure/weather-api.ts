import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { WeatherReading } from '../domain/model/weather-reading.entity';
import { WeatherApiEndpoint } from './weather-api-endpoint';
import { WeatherForecastRequest } from './weather-forecast.request';

/**
 * Facade of the weather provider.
 *
 * @summary Exposes the weather operations to the application layer.
 * @author Gerardo Palacin
 */
@Injectable({ providedIn: 'root' })
export class WeatherApi extends BaseApi {
  /** Endpoint of the forecast service. */
  readonly #forecastEndpoint = new WeatherApiEndpoint(inject(HttpClient));

  /**
   * Gets the current weather of a location.
   * @param request - Coordinates of the location.
   * @returns Stream with the weather reading.
   */
  getCurrentWeather(request: WeatherForecastRequest): Observable<WeatherReading> {
    return this.#forecastEndpoint.getCurrentWeather(request);
  }
}
