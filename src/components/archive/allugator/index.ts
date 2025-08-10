import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
impor

@customElement('arch-allugator')
export class ArchAllugator extends LitElement {
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
      <div class="grid gap-8 py-16 px-16 bg-black">
        <item-header
          title="Allugator"
          tags="Design Partner, Branding, Early stage start-up"
          year="2018"
        ></item-header>
        <div class="grid grid-cols-3 gap-8 *:rounded-[1rem] *:outline *:outline-4 *:outline-zinc-950">
          
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
