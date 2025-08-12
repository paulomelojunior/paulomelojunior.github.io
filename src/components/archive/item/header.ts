import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('item-header')
export class ItemHeader extends LitElement {
  @property({ type: String }) lang = i18next.language
  @property({ type: String }) title: string = ''
  @property({ type: String }) tags: string = ''
  @property({ type: Number }) year: number = 0

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
    const headerList = this.tags.split(',').map((item) => item.trim())
    const headerTags = headerList.map(
      (item) =>
        html`<span>${item}</span><span class="text-zinc-600">/</span>`
    )

    return html`
      <div class="flex items-end justify-between">
        <h2 class="text-[2rem] leading-none text-zinc-200">
          ${this.title}
        </h2>
        <div class="flex gap-2">
          <span class="flex gap-2 text-right">
            ${headerTags}
            ${this.year}
          </span>
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
