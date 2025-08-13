import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
// import logo from './imgs/logo.svg'

@customElement('archive-header')
export class ArchiveHeader extends LitElement {
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
      <div class="py-16 px-5">
        <div class="flex items-center gap-6">
          <h1
            class="text-[2.5rem] h-14 leading-none tracking-[-0.05em] text-stone-950 xl:text-[3rem] 2xl:text-[4rem] dark:text-zinc-200"
          >
            ${i18next.t('featured')}
          </h1>
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
