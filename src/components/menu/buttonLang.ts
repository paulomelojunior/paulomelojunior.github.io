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
      'relative text-[.75rem] tracking-[0.05em] flex items-center transition-all ps-3 pe-1 gap-2 justify-center h-6 hover:h-8 rounded-full hover:bg-stone-950 dark:hover:bg-zinc-200 hover:text-stone-950 dark:hover:text-zinc-950 hover:font-semibold text-zinc-200'
    const buttonClasses = classNames(baseClasses, this.classNames)

    return html`
      <button class="${buttonClasses}" title="${this.title}">
        ${this.label}
        <svg
          width="20px"
          height="20px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          class="stroke-zinc-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M13 2.04932C13 2.04932 16 5.99994 16 11.9999C16 17.9999 13 21.9506 13 21.9506"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M11 21.9506C11 21.9506 8 17.9999 8 11.9999C8 5.99994 11 2.04932 11 2.04932"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M2.62964 15.5H21.3704"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M2.62964 8.5H21.3704"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    `
  }

  createRenderRoot() {
    return this
  }
}
