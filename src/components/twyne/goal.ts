import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

@customElement('twyne-goal')
export class TwyneGoal extends LitElement {
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
    return html`
      <section id="goal" class="container p-24 2xl:p-32">
        <div class="grid grid-cols-4 justify-center">
          <div
            class="col-span-2 col-start-2 flex aspect-square flex-col justify-center"
          >
            <h2
              class="mb-10 text-[2.5rem] leading-none tracking-[-.02em] 2xl:text-[3rem] dark:text-zinc-100"
            >
              ${i18next.t('twyne.goal.t1')}
            </h2>
            <p
              class="mb-8 text-pretty text-[1rem] leading-loose 2xl:text-[1.25rem]"
            >
              ${unsafeHTML(i18next.t('twyne.goal.p1'))}
            </p>
            <p class="text-pretty text-[1rem] leading-loose 2xl:text-[1.25rem]">
              ${i18next.t('twyne.goal.p2')}
            </p>
          </div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
