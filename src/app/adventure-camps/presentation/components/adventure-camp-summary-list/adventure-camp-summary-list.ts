import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';
import { AdventureCampsStore } from '../../../application/adventure-camps.store';
import { AdventureCampSummaryCard } from '../adventure-camp-summary-card/adventure-camp-summary-card';

/**
 * Grid of Adventure Camp Summary cards.
 *
 * @summary Loads the camps and reservations and shows two cards per row, or one on small screens.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-adventure-camp-summary-list',
  imports: [MatGridListModule, MatProgressBarModule, MatButtonModule, TranslatePipe, AdventureCampSummaryCard],
  templateUrl: './adventure-camp-summary-list.html',
  styleUrl: './adventure-camp-summary-list.css'
})
export class AdventureCampSummaryList {
  protected readonly store = inject(AdventureCampsStore);
  private readonly breakpointObserver = inject(BreakpointObserver);

  /** Number of cards per row: two, or one on small screens. */
  protected readonly columns = toSignal(
    this.breakpointObserver.observe('(max-width: 700px)').pipe(map((state) => (state.matches ? 1 : 2))),
    { initialValue: 2 }
  );

  constructor() {
    this.store.loadAll();
  }
}
