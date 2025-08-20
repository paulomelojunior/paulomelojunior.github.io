import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import pic1 from './assets/1.webp'
import pic2 from './assets/2.webp'
import pic3 from './assets/3.webp'
import pic4 from './assets/4.webp'
import pic5 from './assets/5.webp'

@customElement('arch-juris')
export class ArchJuris extends LitElement {
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

  private renderDescription() {
    return `${i18next.t('juris.description1')}`
  }

  render() {
    const contentHtml = `
      <p class="text-[.875rem]">
        ${this.renderDescription()}
      </p>
      <p class="text-[.875rem]">
        ${i18next.t('juris.description2')}
      </p>
    `

    return html`
      <div id="juris" class="grid grid-cols-3 gap-16 py-16">
        <item-header
          title="${i18next.t('juris.title')}"
          tags="${i18next.t('juris.tags')}"
          year="${i18next.t('juris.year')}"
          .contentHtml=${contentHtml}
        ></item-header>
        <div class="col-span-2 grid grid-cols-2 gap-4 *:rounded-[.5rem]">
          <img src="${pic1}" loading="lazy" />
          <img src="${pic2}" loading="lazy" />
          <img src="${pic3}" loading="lazy" />
          <img src="${pic5}" loading="lazy" />
          <img class="col-span-2" src="${pic4}" loading="lazy" />
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
