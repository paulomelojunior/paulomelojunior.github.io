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
      <div id="impact" class="container grid gap-16 px-24 pt-32 2xl:px-32">
        <h2
          class="text-[2.5rem] leading-none tracking-[-.02em] 2xl:text-[3rem] dark:text-zinc-200"
        >
          ${unsafeHTML(i18next.t('twyne.impact.t1'))}
        </h2>

        <div class="grid grid-cols-3">
          <div class="grid gap-2 border-s border-zinc-800 ps-8">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              ${i18next.t('twyne.numbers.t1')}
            </h3>
            <p class="text-pretty text-base/none">
              ${i18next.t('twyne.numbers.p1')}
            </p>
          </div>
          <div class="grid gap-2 border-s border-zinc-800 ps-8">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              ${i18next.t('twyne.numbers.t2')}
            </h3>
            <p class="text-pretty text-base/none">
              ${i18next.t('twyne.numbers.p2')}
            </p>
          </div>
          <div class="grid gap-2 border-s border-zinc-800 ps-8">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              ${i18next.t('twyne.numbers.t3')}
            </h3>
            <p class="text-pretty text-base/none">
              ${i18next.t('twyne.numbers.p3')}
            </p>
          </div>
        </div>
        <ul
          class="grid grid-cols-2 text-[1rem] leading-[2.25] 2xl:text-[1.25rem]"
        >
          ${items.map(
            (item) =>
              html`<li
                class="flex items-center gap-4 before:text-[1rem] before:text-zinc-700 before:content-['✦']"
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
