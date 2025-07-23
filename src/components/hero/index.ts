import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import profile from './profile.png'
import './styles.scss'
import { ThemeMixin } from '../../store/theme'

@customElement('hero-section')
export class HeroSection extends ThemeMixin(LitElement) {
  @property({ type: String }) lang = i18next.language

  connectedCallback() {
    super.connectedCallback()
    i18next.on('languageChanged', () => {
      this.lang = i18next.language
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    i18next.off('languageChanged', () => {
      this.lang = i18next.language
    })
  }

  render() {
    return html`
      <section class="hero">
        <div
          class="container flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-10 pt-12 xl:justify-end xl:gap-0 xl:pt-0"
        >
          <div
            class="flex flex-col items-start justify-end gap-8 px-5 xl:py-24 2xl:py-32"
          >
            <div class="flex items-center gap-4">
              <img
                src="${profile}"
                alt="${i18next.t('about.picDescription')}"
                class="h-16 rounded-full"
              />
              <div class="grid gap-2 leading-none">
                <span class="text-[1.25rem] text-zinc-200">
                  Paulo Melo Jr.
                </span>
                <span class="flex items-center gap-2 text-[1rem]">
                  <div class="size-2 rounded-full bg-green-400"></div>
                  ${i18next.t('about.status')}
                </span>
              </div>
            </div>
            <h1
              class="text-pretty text-[2.5rem] leading-none tracking-[-0.04em] text-stone-950 xl:text-[3rem] 2xl:text-[4rem] dark:text-zinc-200"
            >
              <span class="block xl:hidden">
                ${i18next.t('about.content.m1')}
              </span>
              <span class="block xl:hidden">
                ${i18next.t('about.content.m2')}
              </span>
              <span class="hidden xl:block">
                ${i18next.t('about.content.d1')}
              </span>
              <span class="hidden xl:block">
                ${i18next.t('about.content.d2')}
              </span>
            </h1>
          </div>
          <div
            class="mx-5 hidden h-px bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 xl:block"
          ></div>
          <div class="grid xl:grid-cols-2 xl:gap-24">
            <div class="px-5 xl:py-24 2xl:py-32">
              <p class="leading-loose 2xl:text-[1.25rem]">
                <mark
                  class="inline-block bg-transparent text-stone-950 dark:text-zinc-50"
                  >${i18next.t('about.content.h1')}</mark
                >${i18next.t('about.content.p1')}
              </p>
            </div>
            <div class="hidden xl:block xl:py-24 2xl:py-32">
              <p class="leading-loose 2xl:text-[1.25rem]">
                <mark
                  class="inline-block bg-transparent text-stone-950 dark:text-zinc-50"
                  >${i18next.t('about.content.h2')}</mark
                >${i18next.t('about.content.p2')}
              </p>
            </div>
          </div>
        </div>
        <div id="hero-marquee" class="">
          <div class="container">
            <marquee-element
              items="Design Engineering, Product Design, UX & UI"
            ></marquee-element>
          </div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
