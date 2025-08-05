import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import d0 from '../twyne/imgs/d0.png'
import d2 from '../twyne/imgs/d2.png'
import d3 from '../twyne/imgs/d3.png'

@customElement('twyne-screens')
export class TwyneScreens extends LitElement {
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
      <section
        class="relative mt-32"
      >
        <div class="container">
          <img src="${d0}" class="hidden mb-2 rounded-[.5rem]" />
          <img src="${d2}" class="mb-2 rounded-[.5rem]" />
          <img src="${d3}" class="hidden mb-2 rounded-[.5rem]" />
          <div class="absolute inset-0">
            <div class="flex items-end justify-center sticky top-[calc(100dvh-15rem)] -inset-x-4 h-[15rem] isolate after:z-10 after:absolute after:inset-0 after:content-[''] after:bg-gradient-to-t after:from-black">
              <progressive-blur></progressive-blur>
              <div class="hidden relative z-20 flex gap-px pb-2">
                <button
                  class="flex items-center gap-4 rounded-s-full py-3 pe-4 ps-6 text-[1rem] font-medium leading-none bg-zinc-200/10 hover:bg-zinc-200 transition-all text-zinc-200 hover:text-zinc-950"
                >
                  Prev
                </button>
                <button
                  class="flex items-center gap-4 rounded-e-full py-3 ps-4 pe-6 text-[1rem] font-medium leading-none bg-zinc-200/10 hover:bg-zinc-200 transition-all text-zinc-200 hover:text-zinc-950"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
