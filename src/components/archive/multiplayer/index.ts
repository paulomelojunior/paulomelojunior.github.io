import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import p1 from './assets/1.png'
import s0 from './assets/social-0.png'
import s1 from './assets/social-1.png'
import s2 from './assets/social-2.png'
import s3 from './assets/social-3.png'
import s4 from './assets/social-4.png'
import s5 from './assets/social-5.gif'
import s6 from './assets/social-6.png'
import s7 from './assets/social-7.png'
import s8 from './assets/social-8.gif'

@customElement('arch-multiplayer')
export class ArchTimeline extends LitElement {
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
          title="Orquestra Multiplayer"
          tags="Visual Design, Produção, Voluntário"
          year="2017"
        ></item-header>
        <div class="grid grid-cols-3 gap-8 *:rounded-[1rem] *:outline *:outline-4 *:outline-zinc-950">
          <img src="${s1}"/>
          <img src="${s0}"/>
          <img src="${s3}"/>
          <img src="${s8}"/>
          <img src="${s4}"/>
          <img src="${s2}"/>
          <img src="${s6}"/>
          <img src="${s7}"/>
          <img src="${s5}"/>
          <img class="col-span-3" src="${p1}" />
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
