import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { customElement, property } from 'lit/decorators.js'

@customElement('item-header')
export class ItemHeader extends LitElement {
  @property({ type: String }) lang = i18next.language
  @property({ type: String }) title: string = ''
  @property({ type: String }) tags: string = ''
  @property({ type: Number }) year: number = 2025
  private projectedContentHtml: string = ''

  connectedCallback() {
    super.connectedCallback()
    this.projectedContentHtml = this.innerHTML
    this.innerHTML = ''
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
      (item) => html`<span class="text-zinc-600">/</span><span>${item}</span>`
    )

    return html`
      <div class="sticky top-24 grid items-end gap-8">
        <div class="mb-2 flex flex-wrap gap-2 leading-none">
          <span class="text-brand-400"> ${this.year} </span>
          ${headerTags}
        </div>
        <h2 class="text-[2.5rem] leading-none text-zinc-200">
          ${unsafeHTML(this.title)}
        </h2>
        ${this.projectedContentHtml
          ? html`<div class="flex flex-col gap-4 text-balance leading-loose items-start">
              ${unsafeHTML(this.projectedContentHtml)}
            </div>`
          : null}
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
