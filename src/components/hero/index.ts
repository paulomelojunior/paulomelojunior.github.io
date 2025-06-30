import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import logo from './logo.svg';
import logoLight from './logo-light.svg';
import './styles.scss';
import { ThemeMixin } from '../../store/theme';

@customElement('hero-section')
export class HeroSection extends ThemeMixin(LitElement) {
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
            <div class="flex items-center rounded-full overflow-hidden dark:bg-brand-400 bg-[#DE6868] dark:saturate-100">
              <img src="${this.dark ? logo : logoLight}" alt="Logo" class="h-6" />
              <span class="uppercase ps-3 pe-4 text-sm font-normal tracking-[.5px] dark:tracking-normal dark:font-semibold dark:text-zinc-950 text-stone-200">
                Paulo Melo Jr.
              </span>
            </div>
            <h1 class="text-[2.5rem] leading-none xl:text-[4.5rem] tracking-[-0.04em] dark:text-zinc-200 text-stone-950">
              <span class="block xl:hidden">
                ${i18next.t('about.content.m1')}
              </span>
              <span class="block xl:hidden">
                ${i18next.t('about.content.m2')}
              </span>
              <span class="hidden xl:inline-block">
                ${i18next.t('about.content.d1')}
              </span>
              <span class="hidden xl:inline-block">
                ${i18next.t('about.content.d2')}
              </span>
            </h1>
          </div>
          <div class="hidden xl:block mx-32 h-px bg-gradient-to-r from-transparent to-stone-300 dark:to-zinc-900"></div>
          <div class="grid xl:grid-cols-2">
            <div class="p-5 xl:p-24 2xl:p-32">
              <p class="2xl:text-[1.25rem] leading-loose">
                <mark class="bg-transparent dark:text-zinc-50 text-stone-950 inline-block">${i18next.t('about.content.h1')}</mark>${i18next.t('about.content.p1')}
              </p>
            </div>
            <div class="hidden xl:block p-5 xl:p-24 2xl:p-32">
              <p class="2xl:text-[1.25rem] leading-loose">
                <mark class="bg-transparent dark:text-zinc-50 text-stone-950 inline-block">${i18next.t('about.content.h2')}</mark>${i18next.t('about.content.p2')}
              </p>
            </div>
          </div>
        </div>
        <div id="hero-marquee" class="container">
          <marquee-element items="Design Engineering, Product Design, UX & UI"></marquee-element>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}