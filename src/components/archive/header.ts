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
      <div class="px-14 pb-16 pt-12">
          <h1
            class="text-[2.5rem] leading-none tracking-[-0.04em] text-stone-950 xl:text-[3rem] 2xl:text-[4rem] dark:text-zinc-200"
          >
            Visual archive
          </h1>
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
