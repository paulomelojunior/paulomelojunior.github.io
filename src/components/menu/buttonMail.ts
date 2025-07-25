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
      'hidden xl:flex px-4 gap-2 dark:text-zinc-50 tracking-[0.02em] text-[.75rem] uppercase items-center h-8 leading-none rounded-full whitespace-nowrap outline outline-1 outline-stone-800 dark:outline-zinc-900'
    )

    return html`<button class="menu-item group/item ${classList} relative">
      <div
        class="${classList} pointer-events-none absolute -inset-px justify-center"
        aria-hidden="true"
      >
        <span class="font-semibold text-zinc-950">
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
