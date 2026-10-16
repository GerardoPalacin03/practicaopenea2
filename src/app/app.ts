import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Layout } from './shared/presentation/components/layout/layout';

/**
 * Root component of the application.
 *
 * @summary Registers the supported languages (English by default) and renders the application shell.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /** Translation service shared by the whole application. */
  private readonly translate = inject(TranslateService);

  /** Registers the supported languages and selects English as the default one. */
  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
  }
}
