import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import logo from './imgs/logo.svg';

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
      <div class="pt-12 pb-16 px-14 flex flex-col items-start gap-2">
        <span class="hidden uppercase leading-none tracking-[0.05em] text-[.75rem] dark:text-zinc-500 rounded-full font-medium">
          ${i18next.t('twyne.t1')}
        </span>
        <div class="flex items-center gap-6">
          <img src="${logo}" class="h-14 border-r border-zinc-700 pr-6" />
          <h1 class="text-[2.5rem] leading-none xl:text-[3rem] 2xl:text-[4rem] tracking-[-0.04em] dark:text-zinc-200 text-stone-950">
            ${i18next.t('twyne.t2')}
          </h1>
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 