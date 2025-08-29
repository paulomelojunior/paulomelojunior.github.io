import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import logo from './imgs/logo.svg'

@customElement('twyne-header')
export class TwyneHeader extends LitElement {
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
      <div class="flex flex-col items-start gap-2 px-14 pt-12 pb-16">
        <span
          class="hidden rounded-full text-[.75rem] font-medium uppercase leading-none tracking-[0.05em] dark:text-zinc-500"
        >
          ${i18next.t('twyne.t1')}
        </span>
        <div class="flex items-center gap-6">
          <img src="${logo}" class="h-14 border-r border-zinc-900 pr-6" />
          <h1
            class="h-14 text-[2.5rem] leading-none tracking-[-0.04em] text-brand-950 xl:text-[3rem] 2xl:text-[4rem] dark:text-zinc-100"
          >
            ${i18next.t('twyne.t2')}
          </h1>
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
