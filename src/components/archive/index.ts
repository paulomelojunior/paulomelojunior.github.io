import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import './menu'
import './header'
import './screens'
import './allugator'
import './multiplayer'
import './item'

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
      <section class="container pt-16">
        <archive-header></archive-header>
        <div class="translate-y-[8px] rounded-[2rem] bg-black">
          <div
            class="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <arch-multiplayer></arch-multiplayer>
          <arch-allugator></arch-allugator>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
