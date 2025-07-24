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

  render() {
    return html`<div
        class="hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
      ></div>
      <div
        class="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-zinc-950 text-zinc-500"
      >
        <div class="flex flex-col bg-black xl:p-16">
          <p class="-mt-4 text-[1.25rem] leading-loose 2xl:text-[1.5rem]">
            ${unsafeHTML(i18next.t('twyne.about.p1'))}
          </p>
          <ul
            class="mt-auto border-t border-zinc-900 text-[1rem] leading-none *:border-b *:border-zinc-900 *:py-6"
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
              <span> ${i18next.t('twyne.about.details.contributions')} </span>
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
        <div class="relative flex aspect-square overflow-hidden dark:bg-black">
          <img
            src="${d1}"
            class="absolute left-16 top-16 max-w-none flex-none rounded-ss-lg"
          />
        </div>
      </div>
      <div
        class="hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
      ></div>`
  }

  createRenderRoot() {
    return this
  }
}
