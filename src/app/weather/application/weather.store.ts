import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherReading } from '../domain/model/weather-reading.entity';
import { WeatherApi } from '../infrastructure/weather-api';

/**
 * State of the current weather of the selected location.
 *
 * @summary Signal store that loads the temperature from the weather provider and exposes loading and error state; failures never produce a fake value.
 * @author Gerardo Palacin
 */
@Injectable({ providedIn: 'root' })
export class WeatherStore {
  /** API used to query the weather provider. */
  readonly #weatherApi = inject(WeatherApi);
  /** Lifecycle used to cancel pending requests. */
  readonly #destroyRef = inject(DestroyRef);
  /** Identifier of the latest request, used to ignore outdated answers. */
  #latestRequest = 0;

  readonly #reading = signal<WeatherReading | null>(null);
  readonly #loading = signal(false);
  readonly #error = signal<string | null>(null);

  /** Latest weather reading, or null when there is none. */
  readonly reading = this.#reading.asReadonly();
  /** Whether a request is in progress. */
  readonly loading = this.#loading.asReadonly();
  /** Message of the last failure, or null when the last request succeeded. */
  readonly error = this.#error.asReadonly();
  /** Current temperature in degrees Celsius, or null when it is not available. */
  readonly temperature = computed(() => this.#reading()?.temperature ?? null);

  /**
   * Loads the current weather of a location, discarding the previous one.
   * @param latitude - Latitude of the location.
   * @param longitude - Longitude of the location.
   */
  loadCurrentWeather(latitude: number, longitude: number): void {
    const requestId = ++this.#latestRequest;
    this.#reading.set(null);
    this.#error.set(null);
    this.#loading.set(true);
    this.#weatherApi
      .getCurrentWeather({ latitude, longitude })
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (reading) => {
          if (requestId !== this.#latestRequest) return;
          this.#reading.set(reading);
          this.#loading.set(false);
        },
        error: (error: Error) => {
          if (requestId !== this.#latestRequest) return;
          this.#error.set(error.message);
          this.#loading.set(false);
        }
      });
  }

  /** Clears the weather state, ignoring any request still in progress. */
  reset(): void {
    this.#latestRequest++;
    this.#reading.set(null);
    this.#error.set(null);
    this.#loading.set(false);
  }
}
