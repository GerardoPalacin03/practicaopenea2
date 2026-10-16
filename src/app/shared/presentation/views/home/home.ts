import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AdventureCampSummaryList } from '../../../../adventure-camps/presentation/components/adventure-camp-summary-list/adventure-camp-summary-list';

/**
 * Home view.
 *
 * @summary View reachable at /home that shows the welcome text and the "My Adventure Camps" section.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe, AdventureCampSummaryList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}

