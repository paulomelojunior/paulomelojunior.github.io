import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('twyne-header')
export class TwyneHeader extends LitElement {
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
      <div class="py-16 px-14 flex flex-col">
        <span class="uppercase leading-none tracking-wider xl:text-sm dark:text-zinc-500 font-medium">
          ${i18next.t('twyne.t1')}
        </span>
        <h1 class="text-[4.5rem] leading-none dark:text-zinc-200 tracking-[-.02em]">
          ${i18next.t('twyne.t2')}
        </h1>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 