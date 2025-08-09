import { gsap } from 'gsap'
import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import profile1x from './profile-1x.webp'
import profile2x from './profile-2x.webp'
import profile3x from './profile-3x.webp'
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
  firstUpdated() {
    document
      .querySelectorAll('[data-parallax-layers]')
      .forEach((triggerElement) => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: '0% 0%',
            end: '100% 0%',
            scrub: 0,
          },
        })
        const layers = [{ layer: '1', y: '5rem', opacity: 0 }]
        layers.forEach((layerObj, idx) => {
          tl.to(
            triggerElement.querySelectorAll(
              `[data-parallax-layer="${layerObj.layer}"]`
            ),
            {
              y: layerObj.y,
              ease: 'none',
              opacity: layerObj.opacity,
            },
            idx === 0 ? undefined : '<'
          )
        })
      })
  }

  render() {
    return html`
      <section class="hero" data-parallax-layers>
        <div
          class="container flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-10 pt-12 xl:justify-end xl:gap-0 xl:pt-0"
        >
          <div
            class="flex flex-col items-start justify-end gap-8 px-5 xl:py-24 2xl:py-32"
            data-parallax-layer="1"
          >
            <div class="flex items-center gap-4">
              <img
                src="${profile1x}"
                srcset="
                  ${profile1x} 64w, 
                  ${profile2x} 96w,
                  ${profile3x} 128w
                "
                sizes="64px"
                height="64"
                width="64"
                fetchpriority="high"
                decoding="async"
                loading="eager"
                alt="${i18next.t('about.picDescription')}"
                class="h-16 rounded-full bg-zinc-900"
              />
              <div class="grid gap-2 leading-none">
                <span class="text-[1.25rem] text-white"> Paulo Melo Jr. </span>
                <span class="flex items-center gap-2 text-[1rem]">
                  <span class="relative flex size-3">
                    <span
                      class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400"
                    ></span>
                    <span
                      class="relative m-0.5 inline-flex size-2 rounded-full bg-green-300"
                    ></span>
                  </span>
                  ${i18next.t('about.status')}
                </span>
              </div>
            </div>
            <h1
              class="text-pretty bg-gradient-to-r from-zinc-400 to-white bg-clip-text text-[2.5rem] leading-none tracking-[-0.04em] text-transparent xl:text-[3rem] 2xl:text-[4rem]"
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
            class="relative mx-5 hidden h-px bg-gradient-to-r from-black via-zinc-800 to-black xl:block"
            data-parallax-layer="1"
          ></div>
          <div
            class="grid px-5 xl:grid-cols-2 xl:gap-24"
            data-parallax-layer="1"
          >
            <div class="xl:py-24 2xl:py-32">
              <p class="text-[.875rem] leading-loose 2xl:text-[1.25rem]">
                <mark
                  class="inline-block bg-transparent text-stone-950 dark:text-white"
                  >${i18next.t('about.content.h1')}</mark
                >${i18next.t('about.content.p1')}
              </p>
            </div>
            <div class="hidden xl:block xl:py-24 2xl:py-32">
              <p class="leading-loose 2xl:text-[1.25rem]">
                <mark
                  class="inline-block bg-transparent text-stone-950 dark:text-white"
                  >${i18next.t('about.content.h2')}</mark
                >${i18next.t('about.content.p2')}
              </p>
            </div>
          </div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
