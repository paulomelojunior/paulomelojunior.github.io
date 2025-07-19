import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import d1 from './imgs/d1.png';

@customElement('twyne-about')
export class TwyneAbout extends LitElement {
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
    return html`<div class="hidden xl:block h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      <div class="rounded-[2rem] grid grid-cols-2 border border-zinc-950 overflow-hidden">
        <div class="xl:p-16 flex flex-col bg-black">
        <p class="text-[1.25rem] 2xl:text-[1.5rem] leading-loose font-light -mt-4">
          ${unsafeHTML(i18next.t('twyne.about.p1'))}
        </p>
        <ul class="mt-auto *:py-6 *:border-b *:border-zinc-900 border-t border-zinc-900 leading-none text-[1rem]">
          <li class="flex justify-between align-baseline">
            <span>
              ${i18next.t('twyne.about.details.company')}
            </span>
            <span class="text-right text-zinc-200">
              ${i18next.t('twyne.about.details.companyValue')}
            </span>
          </li>
          <li class="flex justify-between align-baseline">
            <span>
              ${i18next.t('twyne.about.details.industry')}
            </span>
            <span class="text-right text-zinc-200">
              ${i18next.t('twyne.about.details.industryValue')}
            </span>
          </li>
          <li class="flex justify-between align-baseline">
            <span>
              ${i18next.t('twyne.about.details.product')}
            </span>
            <span class="text-right text-zinc-200">
              ${i18next.t('twyne.about.details.productValue')}
            </span>
          </li>
          <li class="flex justify-between align-baseline">
            <span>
              ${i18next.t('twyne.about.details.contributions')}
            </span>
            <span class="flex gap-2 text-right text-zinc-200">
              ${i18next.t('twyne.about.details.contribution1')}
              <span class="text-zinc-500">/</span>
              ${i18next.t('twyne.about.details.contribution2')}
              <span class="text-zinc-500">/</span>
              ${i18next.t('twyne.about.details.contribution3')}
            </span>
          </li>
        </ul>
      </div>
      <div class="flex aspect-square dark:bg-black relative overflow-hidden">
        <img src="${d1}" class="absolute top-16 left-16 flex-none max-w-none rounded-ss-lg">
      </div>
      
    </div><div class="hidden xl:block h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>`;
  }

  createRenderRoot() {
    return this;
  }
} 