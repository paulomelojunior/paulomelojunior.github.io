import { gsap } from 'gsap'
import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import d1 from './imgs/d1.png'

@customElement('twyne-about')
export class TwyneAbout extends LitElement {
  @property({ type: String }) lang = i18next.language

  connectedCallback() {
    super.connectedCallback()
    i18next.on('languageChanged', this.handleLanguageChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    i18next.off('languageChanged', this.handleLanguageChange)
  }

  private handleLanguageChange = () => {
    this.lang = i18next.language
  }

  firstUpdated() {
    const coverImage = document.querySelector('#cover-image')
    if (!coverImage) return

    gsap.to(coverImage, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: 2,
      },
      y: '-5rem',
      ease: 'none',
    })
  }

  render() {
    return html`
      <div
        id="about"
        class="grid grid-cols-2 overflow-hidden rounded-[2rem] bg-gradient-to-b from-zinc-950 translate-y-[4px]"
      ><div
        class="absolute h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
      ></div>
        <div class="flex flex-col xl:p-16">
          <p class="-mt-3 text-[1rem] leading-loose 2xl:text-[1.5rem]">
            ${unsafeHTML(i18next.t('twyne.about.p1'))}
          </p>
          <ul
            class="mt-auto text-[.75rem] 2xl:text-[1rem] leading-none *:py-6"
          >
            <li class="flex justify-between align-baseline">
              <span> ${i18next.t('twyne.about.details.company')} </span>
              <span class="text-right text-zinc-200">
                ${i18next.t('twyne.about.details.companyValue')}
              </span>
            </li>
            <li class="flex justify-between align-baseline">
              <span> ${i18next.t('twyne.about.details.industry')} </span>
              <span class="text-right text-zinc-200">
                ${i18next.t('twyne.about.details.industryValue')}
              </span>
            </li>
            <li class="flex justify-between align-baseline">
              <span> ${i18next.t('twyne.about.details.product')} </span>
              <span class="text-right text-zinc-200">
                ${i18next.t('twyne.about.details.productValue')}
              </span>
            </li>
            <li class="flex justify-between align-baseline">
              <span class="text-brand-400"> ${i18next.t('twyne.about.details.contributions')} </span>
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
        <div class="relative flex aspect-square overflow-hidden">
          <img
            src="${d1}"
            id="cover-image"
            class="absolute shadow-[0px_24px_24px_0px_black] left-16 top-16 max-w-none flex-none rounded-ss-lg border-t border-zinc-800"
          />
          <progressive-blur class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></progressive-blur>
        </div>
      </div>`
  }

  createRenderRoot() {
    return this
  }
}
