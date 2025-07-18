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
      <div class="pt-12 pb-16 px-14 flex flex-col">
        <span class="uppercase leading-none tracking-[0.05em] text-[.75rem] dark:text-zinc-500 font-semibold">
          ${i18next.t('twyne.t1')}
        </span>
        <h1 class="text-[2.5rem] leading-none xl:text-[3.5rem] 2xl:text-[4.5rem] tracking-[-0.04em] dark:text-zinc-200 text-stone-950">
          ${i18next.t('twyne.t2')}
        </h1>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 