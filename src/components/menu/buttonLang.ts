import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import classNames from 'classnames'

@customElement('lang-button')
export class LangButton extends LitElement {
  @property({ type: String }) classNames = ''
  @property({ type: String }) icon = ''
  @property({ type: String }) label = ''
  @property({ type: String }) title = ''

  render() {
    const baseClasses =
      'relative text-[.75rem] tracking-[0.05em] flex items-center transition-all px-3 justify-center h-6 hover:h-8 rounded-full hover:bg-stone-950 dark:hover:bg-zinc-200 hover:text-stone-950 dark:hover:text-zinc-950 dark:font-semibold text-brand-400 xl:text-zinc-500'
    const buttonClasses = classNames(baseClasses, this.classNames)

    return html`
      <button class="${buttonClasses}" title="${this.title}">
        ${this.label}
      </button>
    `
  }

  createRenderRoot() {
    return this
  }
}
