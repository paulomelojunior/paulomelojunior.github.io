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
      <div class="grid gap-8 p-16 bg-black">
        <item-header
          title="allugator.com"
          tags="Design Partner, Branding, Early stage start-up"
          year="2018"
        ></item-header>
        <div class="grid grid-cols-3 gap-16 *:rounded-[.5rem] *:transition-all *:duration-300 *:ease-in-out *:opacity-75 *:grayscale hover:*:opacity-100 hover:*:grayscale-0">
          <div class="col-span-2 row-span-2">
            <img src="${social7}" />
          </div>
          <img src="${social2}" />
          <img src="${social3}" />
          <img src="${social1}" />
          <img src="${social5}" />
          <img src="${social4}" />
        </div>
        <div class="grid grid-cols-3 gap-16 my-32 items-center">
          <div class="grid gap-2 ps-8 border-s border-zinc-800">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              R$ 2.4 M valuation	
            </h3>
            <p class="text-[1rem] leading-none">
              EqSeed: 46 investidores em 2018
            </p>
          </div>
          <div class="grid gap-2 ps-8 border-s border-zinc-800">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              + 7000 usuários novos
            </h3>
            <p class="text-[1rem] leading-none">
              + 100% em relação a 2017
            </p>
          </div>
          <div class="grid gap-2 ps-8 border-s border-zinc-800">
            <h3 class="text-[2rem] leading-none dark:text-zinc-200">
              + 1000 diárias em 2018
            </h3>
            <p class="text-[1rem] leading-none">
              + 100% em relação a 2017
            </p>
          </div>
        </div>
        <allu-press></allu-press>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
