import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './press'
import social1 from './assets/social-1.jpg'
import social2 from './assets/social-2.jpg'
import social3 from './assets/social-3.png'
import social4 from './assets/social-4.png'
import social5 from './assets/social-5.jpg'
import social7 from './assets/social-7.png'

@customElement('arch-allugator')
export class ArchAllugator extends LitElement {
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
    const contentHtml = `
      <p class="mb-3 text-[.875rem]">
        ${i18next.t('allugator.description')}
      </p>
      <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
        <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
          ${i18next.t('allugator.metrics.valuation.title')}
        </h3>
        <p class="text-[.875rem] leading-none">${i18next.t('allugator.metrics.valuation.subtitle')}</p>
      </div>
      <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
        <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
          ${i18next.t('allugator.metrics.users.title')}
        </h3>
        <p class="text-[.875rem] leading-none">${i18next.t('allugator.metrics.users.subtitle')}</p>
      </div>
      <div class="my-3 grid gap-3 border-s border-zinc-800 ps-4">
        <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
          ${i18next.t('allugator.metrics.daily.title')}
        </h3>
        <p class="text-[.875rem] leading-none">${i18next.t('allugator.metrics.daily.subtitle')}</p>
      </div>
    `

    return html`
      <div id="allugator" class="grid grid-cols-3 gap-16 py-16">
        <item-header
          title="${i18next.t('allugator.title')}"
          tags="${i18next.t('allugator.tags')}"
          year="${i18next.t('allugator.year')}"
          .contentHtml=${contentHtml}
        ></item-header>
        <div class="col-span-2 grid grid-cols-3 gap-4 *:rounded-[.5rem]">
          <img src="${social4}" loading="lazy" />
          <img src="${social2}" loading="lazy" />
          <img src="${social3}" loading="lazy" />
          <img class="col-span-2 row-span-2" src="${social7}" loading="lazy" />
          <img src="${social1}" loading="lazy" />
          <img src="${social5}" loading="lazy" />
          <div class="col-span-3">
            <allu-press></allu-press>
          </div>
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
