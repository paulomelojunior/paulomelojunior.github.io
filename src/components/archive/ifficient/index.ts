import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import p1 from './assets/homepage-preview.webp'
import e1 from './assets/e1.webp'
import e2 from './assets/e2.webp'
import e3 from './assets/e3.webp'
import './zoom'

@customElement('arch-ifficient')
export class ArchIfficient extends LitElement {
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
    const contentHtml = `
      <p class="text-[.875rem]">
        ${i18next.t('ifficient.description1')}
      </p>
      <p class="text-[.875rem]">
        ${i18next.t('ifficient.description2')}
      </p>
      <a
        href="/twyne"
        class="cta-button inline-flex items-center gap-4 mt-6 px-6"
      >
        ${i18next.t('ifficient.cta')}
      </a>
    `

    return html`
      <div id="ifficient" class="grid grid-cols-3 gap-24 py-16">
        <item-header title="${i18next.t('ifficient.title')}" tags="${i18next.t('ifficient.tags')}" .contentHtml=${contentHtml}></item-header>
        <div class="col-span-2 grid gap-4 *:rounded-[.75rem]">
          <div
            class="relative group cursor-pointer aspect-video overflow-hidden border-2 border-zinc-900 before:hover:opacity-1 before:absolute before:inset-0 hover:before:bg-black/50 before:transition-colors before:duration-200"
            @click=${this.handleSeeFullPage}
          >
            <img id="ifficient-homepage" class="w-full" src="${p1}" />
            <div
              class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full py-3 px-5 text-[1rem] font-medium leading-[20px] text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur duration-200 bg-zinc-200/15 hover:bg-zinc-200/30"
            >
              ${i18next.t('ifficient.fullView')}
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
