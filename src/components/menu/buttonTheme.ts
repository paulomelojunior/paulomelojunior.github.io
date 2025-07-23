import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import classNames from 'classnames'

@customElement('theme-button')
export class ThemeButton extends LitElement {
  @property({ type: String }) classNames = ''
  @property({ type: String }) icon = ''

  render() {
    const baseClasses =
      'relative tracking-[0.05em] flex items-center transition-all justify-center size-8 hover:size-10 rounded-full hover:bg-stone-950 dark:hover:bg-zinc-200 hover:text-stone-950 dark:hover:text-zinc-200'
    const buttonClasses = classNames(baseClasses, this.classNames)

    return html`
      <button class="${buttonClasses}">
        <i
          class="ph-fill ph-${this
            .icon} rounded-full bg-stone-200 text-[1.25rem] dark:bg-zinc-950"
        ></i>
      </button>
    `
  }

  createRenderRoot() {
    return this
  }
}
