import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

@customElement('twyne-impact')
export class TwyneImpact extends LitElement {
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
    const items = i18next.t('twyne.impact.l1', {
      returnObjects: true,
    }) as string[]
    return html`
      <div
        id="impact"
        class="container grid grid-cols-2 items-baseline rounded-b-[2rem] px-24 2xl:px-32"
      >
        <h2
          class="text-[2.5rem] leading-none tracking-[-.02em] 2xl:text-[3rem] dark:text-zinc-200"
        >
          ${unsafeHTML(i18next.t('twyne.impact.t1'))}
        </h2>
        <ul
          class="text-[1rem] leading-[2.25] 2xl:text-[1.25rem] dark:text-zinc-200"
        >
          ${items.map(
            (item) =>
              html`<li
                class="flex items-center gap-5 text-center before:text-[1rem] before:text-zinc-600 before:content-['✦']"
              >
                ${item}
              </li>`
          )}
        </ul>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
