import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

/**
 * Language switcher.
 *
 * @summary Select buttons (EN / ES) that change the language used by the translation service.
 * @author Gerardo Palacin
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  /** Translation service shared by the whole application. */
  private readonly translate = inject(TranslateService);

  /** Available language codes. */
  protected readonly languages: string[] = [...this.translate.getLangs()];

  /** Language code currently selected. */
  protected currentLang: string = this.translate.getCurrentLang() ?? 'en';

  /**
   * Changes the language of the application.
   * @param language - Language code to use, such as "en" or "es".
   */
  protected useLanguage(language: string): void {
    this.translate.use(language);
    this.currentLang = language;
  }
}
