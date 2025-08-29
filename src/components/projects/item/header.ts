import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { customElement, property } from 'lit/decorators.js'

@customElement('item-header')
export class ItemHeader extends LitElement {
  @property({ type: String }) title: string = ''
  @property({ type: String }) tags: string = ''
  @property({ type: String }) year: string = '2025'
  @property({ type: String }) contentHtml: string = ''

  connectedCallback() {
    super.connectedCallback()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }


  render() {
    const headerList = this.tags.split(',').map((item) => item.trim())
    const headerTags = headerList.map(
      (item) => html`<span class="text-[.875rem] text-zinc-600">/</span><span>${item}</span>`
    )

    return html`
      <div class="sticky top-20 grid items-end gap-8">
        <div class="mb-2 flex flex-wrap gap-2 leading-none text-[.875rem]">
          <span class="text-zinc-100"> ${this.year} </span>
          ${headerTags}
        </div>
        <h2 class="text-[2.5rem] leading-none text-zinc-100">${this.title}</h2>
        ${this.contentHtml
          ? html`<div class="flex flex-col gap-4 text-balance leading-loose items-start">
              ${unsafeHTML(this.contentHtml)}
            </div>`
          : null}
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
