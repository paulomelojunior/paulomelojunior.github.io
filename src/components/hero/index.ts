import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import logo from './logo.svg';
import logoLight from './logo-light.svg';
import profile from './profile.png';
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
          <div class="p-5 xl:py-24 2xl:py-32 flex flex-col justify-end items-start gap-8">
            <div class="flex items-center gap-4">
              <img src="${profile}" alt="${i18next.t('about.picDescription')}" class="h-16 rounded-full" />
              <div class="grid gap-2 leading-none">
                <span class="text-[1.25rem] tracking-[0.025em]  text-zinc-200">
                  Paulo Melo Jr.
                </span>
                <span class="flex items-center gap-2 text-[1rem]">
                  <div class="size-2 bg-green-400 rounded-full"></div>
                  ${i18next.t('about.status')}
                </span>
              </div>
            </div>
            <div class="hidden items-center rounded-full overflow-hidden dark:bg-brand-400 bg-[#DE6868] dark:saturate-100">
              <img src="${this.dark ? logo : logoLight}" alt="Logo" class="h-6" />
              <span class="uppercase ps-3 pe-4 text-sm font-normal tracking-[0.025em] dark:tracking-normal dark:font-semibold dark:text-black text-stone-200">
                ${i18next.t('about.greeting')}
              </span>
            </div>
            <h1 class="text-[2.5rem] leading-none xl:text-[3rem] 2xl:text-[4rem] font-medium tracking-[-0.02em] dark:text-zinc-200 text-stone-950 text-pretty">
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
          <div class="hidden xl:block mx-5 h-px bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900"></div>
          <div class="grid xl:grid-cols-2 xl:gap-24">
            <div class="ps-5 xl:py-24 2xl:py-32">
              <p class="2xl:text-[1.25rem] leading-loose">
                <mark class="bg-transparent dark:text-zinc-50 text-stone-950 inline-block">${i18next.t('about.content.h1')}</mark>${i18next.t('about.content.p1')}
              </p>
            </div>
            <div class="hidden xl:block xl:py-24 2xl:py-32">
              <p class="2xl:text-[1.25rem] leading-loose">
                <mark class="bg-transparent dark:text-zinc-50 text-stone-950 inline-block">${i18next.t('about.content.h2')}</mark>${i18next.t('about.content.p2')}
              </p>
            </div>
          </div>
        </div>
        <div id="hero-marquee" class="">
          <div class="container">
            <marquee-element items="Design Engineering, Product Design, UX & UI"></marquee-element>
          </div>
        </div>
      </section>
    `;
  }

  createRenderRoot() {
    return this;
  }
}