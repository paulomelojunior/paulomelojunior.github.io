import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import pic from '../../assets/imgs/pic-2x.webp';

@customElement('about-section')
export class AboutSection extends LitElement {
  @property({ type: String }) lang = i18next.language;

  connectedCallback() {
    super.connectedCallback();
    i18next.on('languageChanged', () => {
      this.lang = i18next.language;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    i18next.off('languageChanged', () => {
      this.lang = i18next.language;
    });
  }
  
  
  render() {
    return html`
      <section class="relative">
        <div id="who" class="container flex flex-col xl:grid xl:grid-cols-3 gap-1">
          <picture class="h-[100vw] overflow-hidden rounded-[2rem] relative aspect-square xl:h-auto contrast-[1.05] invert-[0.05] saturate-[0.8] hue-rotate-[-10deg]">
          <img class="h-full object-cover" alt="${i18next.t('about.picDescription')}" loading="eager" src="${pic}" />
          </picture>
          <progressive-blur custom="xl:hidden absolute z-10 inset-x-0 h-32 top-[100vw] -translate-y-full rotate-180"></progressive-blur>
          <div class="2xl:gap-0 2xl:p-32 2xl:text-[1.25rem] xl:text-[1.125rem] col-span-2 flex flex-col font-normal gap-4 justify-between leading-loose px-5 py-16 rounded-[2rem] text-zinc-400 xl:bg-zinc-900 xl:p-20">
            <p class="text-pretty">
              <mark class="bg-transparent text-zinc-100 inline-block">${i18next.t('about.content.h1')}</mark>, ${i18next.t('about.content.p1')}
            </p>
            <p class="text-pretty">
              <mark class="inline-block bg-transparent text-zinc-100">${i18next.t('about.content.h2')}</mark>, ${i18next.t('about.content.p2')}
            </p>
          </div>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}