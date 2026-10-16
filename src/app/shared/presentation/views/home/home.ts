import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Home view.
 *
 * @summary View reachable at /home that shows the welcome text and the "My Adventure Camps" section.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}

