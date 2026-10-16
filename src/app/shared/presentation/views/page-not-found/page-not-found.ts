import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Page-not-found view.
 *
 * @summary Fallback view for unsupported routes; shows the path that was not found and a button to return to Home.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButtonModule, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  /** Router used to go back to Home. */
  private readonly router = inject(Router);

  /** Route that matched the wildcard, used to read the unsupported path. */
  private readonly route = inject(ActivatedRoute);

  /** Unsupported path requested by the user. */
  protected readonly invalidPath = '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');

  /** Navigates back to the Home view. */
  protected navigateToHome(): void {
    this.router.navigate(['/home']).then();
  }
}

