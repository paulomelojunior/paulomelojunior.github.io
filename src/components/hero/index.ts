import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import logo from './logo.svg';
import './styles.scss';

@customElement('hero-section')
export class HeroSection extends LitElement {
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
      <section class="hero">
        <div class="min-h-[calc(100svh-4rem)] pt-16 xl:pt-0 flex flex-col justify-center xl:justify-end container">
          <div class="p-5 xl:p-24 2xl:p-32 xl:pt-48 flex flex-col justify-end items-start gap-5">
            <div class="flex items-center rounded-full overflow-hidden bg-brand-400">
              <img src="${logo}" alt="Logo" class="h-6" />
              <span class="uppercase ps-3 pe-4 text-sm font-semibold text-black">
                Paulo Melo Jr.
              </span>
            </div>
            <h1 class="text-[2.5rem] leading-none xl:text-[4.5rem] tracking-[-0.04em] text-zinc-200">
              <span class="block xl:hidden">
                Product designer
              </span>
              <span class="block xl:hidden">
                and creative coder
              </span>
              <span class="hidden xl:inline-block">
                Designer and creative coder crafting
              </span>
              <span class="hidden xl:inline-block">
                future-ready digital interactions.
              </span>
            </h1>
          </div>
          <div class="hidden xl:block mx-32 h-px bg-gradient-to-r from-transparent via-zinc-900 to-zinc-700"></div>
          <div class="grid xl:grid-cols-2">
            <div class="p-5 xl:p-24 2xl:p-32">
              <p class="2xl:text-[1.25rem] leading-loose">
                <mark class="bg-transparent text-white inline-block">${i18next.t('about.content.h1')}</mark>, ${i18next.t('about.content.p1')}
              </p>
            </div>
            <div class="hidden xl:block p-5 xl:p-24 2xl:p-32">
              <p class="2xl:text-[1.25rem] leading-loose">
                <mark class="bg-transparent text-white inline-block">${i18next.t('about.content.h2')}</mark>,
                ${i18next.t('about.content.p2')}
              </p>
            </div>
          </div>
        </div>
        <div id="hero-marquee" class="container">
          <marquee-element items="Design Engineering, Product Design, UX and UI"></marquee-element>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}