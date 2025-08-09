import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('archive-timeline')
export class ArchiveTimeline extends LitElement {
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
      <section class="container">
        <div class="grid grid-cols-4">
          <div class="col-span-1 bg-slate-900">
            <ul>
              <li>
                Ifficient
              </li>
              <li>
                Allugator
              </li>
              <li>
                Multiplayer
              </li>
            </ul>
          </div>
          <div class="col-span-3 bg-slate-900">
            
          </div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
