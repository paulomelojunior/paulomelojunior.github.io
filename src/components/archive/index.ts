import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './allugator'
import './header'
import './ifficient'
import './item'
import './menu'
import './multiplayer'
import './screens'

@customElement('archive-index')
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
      <section class="container pt-12">
        <archive-header></archive-header>
        <div class="px-5">
          <arch-ifficient></arch-ifficient>
          <div
            class="my-16 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <arch-allugator></arch-allugator>
          <div
            class="my-16 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <arch-multiplayer></arch-multiplayer>
          <div
            class="mt-16 mb-32 h-px w-full bg-gradient-to-r bg-transparent"
          ></div>
          <cases-section></cases-section>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
