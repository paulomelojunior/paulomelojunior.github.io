import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import p1 from './assets/homepage.png'
import e1 from './assets/e1.png'
import e2 from './assets/e2.png'
import e3 from './assets/e3.png'
import './zoom'

@customElement('arch-ifficient')
export class ArchIfficient extends LitElement {
  @property({ type: String }) lang = i18next.language

  // removidos: lógica de zoom internalizada no componente <img-zoom>

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

  private createZoomBox = (target: HTMLImageElement) => {
    const el = document.createElement('img-zoom')
    el.setAttribute('src', target.src)
    return el
  }

  // removidos: init/close do zoom (agora em <img-zoom>)

  private handleSeeFullPage = () => {
    const homepage = document.querySelector<HTMLImageElement>(
      '#ifficient-homepage'
    )
    if (homepage) {
      const box = this.createZoomBox(homepage)
      document.body.appendChild(box)
    }
  }

  render() {
    return html`
      <div class="grid grid-cols-3 gap-4 py-16">
        <item-header title="Ifficient" tags="UX, UI, Front-end">
          <p>
            Companhia de marketing interativo especializada em geração de leads,
            com base em Denver, CO.
          </p>
          <p>
            Nela liderei o design dos softwares Twyne e Path Evolution,
            assegurando escalabilidade e consistência na evolução dos produtos.
          </p>
        </item-header>
        <div class="col-span-2 grid gap-4 *:rounded-[.75rem]">
          <div
            class="relative group cursor-pointer aspect-video overflow-hidden border-2 border-zinc-900 before:hover:opacity-1 before:absolute before:inset-0 hover:before:bg-black/50 before:transition-colors before:duration-200"
            @click=${this.handleSeeFullPage}
          >
            <img id="ifficient-homepage" class="w-full" src="${p1}" />
            <div
              class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-zinc-950 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              See full page
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4 *:rounded-[.75rem]">
            <img src="${e2}" />
            <img src="${e1}" />
            <img src="${e3}" />
          </div>
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
