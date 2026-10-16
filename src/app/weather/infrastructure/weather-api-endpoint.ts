import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { WeatherReading } from '../domain/model/weather-reading.entity';
import { WeatherForecastRequest } from './weather-forecast.request';
import { WeatherForecastResponse } from './weather-forecast.response';
import { WeatherReadingAssembler } from './weather-reading.assembler';

/**
 * Endpoint of the Open-Meteo forecast service.
 *
 * @summary Queries the current temperature of a location; it does not extend the base endpoint because the provider returns no identifiers.
 * @author Gerardo Palacin
 */
export class WeatherApiEndpoint {
  /** Complete URL of the forecast endpoint, built from the environment settings. */
  readonly #endpointUrl = `${environment.weatherProviderApiBaseUrl}${environment.weatherProviderForecastEndpointPath}`;
  /** Assembler that converts the response into an entity. */
  readonly #assembler = new WeatherReadingAssembler();

  /**
   * @param http - HTTP client used for the requests.
   */
  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches the current weather of a location.
   * @param request - Coordinates of the location.
   * @returns Stream with the weather reading; it fails when the provider cannot be reached or answers without a temperature.
   */
  getCurrentWeather(request: WeatherForecastRequest): Observable<WeatherReading> {
    const params = new HttpParams()
      .set('latitude', request.latitude)
      .set('longitude', request.longitude)
      .set('current', 'temperature_2m');
    return this.http.get<WeatherForecastResponse>(this.#endpointUrl, { params }).pipe(
      map((response) => this.#assembler.toEntityFromResponse(response, request)),
      catchError((error: HttpErrorResponse | Error) => {
        const reason = error instanceof HttpErrorResponse ? error.statusText || 'Weather service not reachable' : error.message;
        return throwError(() => new Error(`Failed to fetch the weather: ${reason}`));
      })
    );
  }
}
