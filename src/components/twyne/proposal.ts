import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('twyne-solution')
export class TwyneSolution extends LitElement {
  @property({ type: String }) lang = i18next.language;

  connectedCallback() {
    super.connectedCallback();
    i18next.on('languageChanged', this.handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    i18next.off('languageChanged', this.handleLanguageChange);
  }

  private handleLanguageChange = () => {
    this.lang = i18next.language;
  };

  render() {
    return html`
      <h2 class="text-[3rem] tracking-[-.04em] dark:text-zinc-200 leading-none mb-10">
        ${i18next.t('twyne.solution.t1')}
      </h2>
      <div class="grid grid-cols-2">
        <p class="text-[1.25rem] leading-loose">
          ${unsafeHTML(i18next.t('twyne.solution.p1'))}
        </p>
        <p class="text-[1.25rem] leading-loose">
          ${i18next.t('twyne.solution.p2')}
        </p>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 