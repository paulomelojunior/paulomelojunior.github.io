import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import classNames from 'classnames'

@customElement('mail-button')
export class MailButton extends LitElement {
  @property({ type: String }) href: string = ''
  @property({ type: String }) label: string = ''
  @property({ type: String }) hover: string = ''

  render() {
    const classList = classNames(
      'hidden xl:flex px-4 gap-2 dark:text-zinc-50 tracking-[0.05em] text-[.75rem] uppercase items-center h-8 leading-[3.125rem] rounded-full whitespace-nowrap'
    )

    return html`<button class="menu-item group/item ${classList} relative">
      <div
        class="${classList} pointer-events-none absolute inset-0 justify-center"
        aria-hidden="true"
      >
        <span class="font-medium text-zinc-950">
          ${this.hover ? this.hover : this.label}
        </span>
      </div>
      ${this.label}
    </button>`
  }

  createRenderRoot() {
    return this
  }
}
