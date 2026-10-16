import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

/**
 * Application shell.
 *
 * @summary Toolbar with the logo and title on the left and the language switcher on the right, a side navigation with the main options and the routed content.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    TranslatePipe,
    LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  /** Observer of the viewport size used to adapt the side navigation. */
  private readonly breakpointObserver = inject(BreakpointObserver);

  /** Whether the viewport is small, so the side navigation overlays the content. */
  protected readonly isCompact = toSignal(
    this.breakpointObserver.observe('(max-width: 900px)').pipe(map((state) => state.matches)),
    { initialValue: false }
  );

  /** Navigation options shown in the side navigation. */
  protected readonly options = [
    { link: '/home', label: 'option.home', icon: 'home' },
    { link: '/reservations/new', label: 'option.new-reservation', icon: 'event_available' }
  ];

  /**
   * Closes the side navigation after choosing an option when it overlays the content.
   * @param sidenav - Side navigation to close.
   */
  protected closeWhenCompact(sidenav: MatSidenav): void {
    if (this.isCompact()) {
      sidenav.close();
    }
  }
}
