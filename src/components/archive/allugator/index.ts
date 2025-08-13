import i18next from '../../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './press'
import social1 from './assets/social-1.jpg'
import social2 from './assets/social-2.jpg'
import social3 from './assets/social-3.png'
import social4 from './assets/social-4.png'
import social5 from './assets/social-5.jpg'
import social7 from './assets/social-7.png'

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
      <div class="grid grid-cols-3 gap-4 py-16">
        <item-header
          title="Allugator"
          tags="Design Partner, Branding, Early stage start-up"
          year="2018"
        >
          <div class="my-3 grid gap-2 border-s border-zinc-800 ps-4">
            <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
              R$ 2.4 M valuation
            </h3>
            <p class="leading-none">EqSeed: 46 investidores em 2018</p>
          </div>
          <div class="my-3 grid gap-2 border-s border-zinc-800 ps-4">
            <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
              + 7000 usuários novos
            </h3>
            <p class="leading-none">+ 100% em relação a 2017</p>
          </div>
          <div class="my-3 grid gap-2 border-s border-zinc-800 ps-4">
            <h3 class="text-[1.25rem] leading-none dark:text-zinc-200">
              + 1000 diárias em 2018
            </h3>
            <p class="leading-none">+ 100% em relação a 2017</p>
          </div>
        </item-header>
        <div class="col-span-2 grid grid-cols-3 gap-4 *:rounded-[.5rem]">
          <img src="${social4}" />
          <img src="${social2}" />
          <img src="${social3}" />
          <img class="col-span-2 row-span-2" src="${social7}" />
          <img src="${social1}" />
          <img src="${social5}" />
          <div class="col-span-3">
            <allu-press></allu-press>
          </div>
        </div>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
