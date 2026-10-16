import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TranslatePipe } from '@ngx-translate/core';
import { AdventureCampSummary } from '../../../domain/model/adventure-camp-summary.model';

/**
 * Adventure Camp Summary card.
 *
 * @summary Shows the camp name, its reservations (or "Empty"), the total participants and the available capacity.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-adventure-camp-summary-card',
  imports: [MatCardModule, MatListModule, TranslatePipe],
  templateUrl: './adventure-camp-summary-card.html',
  styleUrl: './adventure-camp-summary-card.css'
})
export class AdventureCampSummaryCard {
  /** Summary shown by the card. */
  readonly summary = input.required<AdventureCampSummary>();
}
