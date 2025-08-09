import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('archive-multiplayer')
export class ArchiveMultiplayer extends LitElement {
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
      <div>
        asdasda
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
