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
      <div class="rounded-[2rem] grid grid-cols-2 border border-zinc-900 overflow-hidden">
        <div class="xl:p-16 flex flex-col bg-black">
        <p class="text-[1.25rem] 2xl:text-[1.5rem] leading-loose">
          ${unsafeHTML(i18next.t('twyne.about.p1'))}
        </p>
        <ul class="mt-auto *:py-6 *:border-b *:border-zinc-900 border-t border-zinc-900 leading-none text-[.875rem]">
          <li class="flex justify-between align-baseline">
            <span>
              Industry
            </span>
            <span class="text-right text-zinc-200">
              AdTech
            </span>
          </li>
          <li class="flex justify-between align-baseline">
            <span>
              Product
            </span>
            <span class="text-right text-zinc-200">
              Software as a Service
            </span>
          </li>
          <li class="flex justify-between align-baseline">
            <span>
              Contributions
            </span>
            <span class="flex gap-2 text-right text-zinc-200">
              Product Design
              <span class="text-zinc-500">/</span>
              Design System
              <span class="text-zinc-500">/</span>
              UI Engineering
            </span>
          </li>
        </ul>
      </div>
      <div class="flex aspect-square dark:bg-black relative overflow-hidden">
        <img src="${d1}" class="absolute top-16 left-16 flex-none max-w-none rounded-ss-lg">
      </div>
    </div>`;
  }

  createRenderRoot() {
    return this;
  }
} 