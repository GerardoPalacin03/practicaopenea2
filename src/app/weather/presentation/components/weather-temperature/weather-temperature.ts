import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { WeatherStore } from '../../../application/weather.store';

/**
 * Temperature indicator.
 *
 * @summary Shows the temperature loaded in the weather store, or a loading or error message.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-weather-temperature',
  imports: [MatIconModule, TranslatePipe],
  templateUrl: './weather-temperature.html',
  styleUrl: './weather-temperature.css'
})
export class WeatherTemperature {
  /** Store with the weather state. */
  protected readonly store = inject(WeatherStore);
}
