import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import m1 from './mockup-1.png'
import m2 from './mockup-2.png'

@customElement('cases-section')
export class CasesSection extends LitElement {
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

  private renderTitle(title: string) {
    const parts = title.split("<br class='block xl:hidden'>")
    if (parts.length > 1) {
      return html`
        ${parts[0]}
        <br class="block xl:hidden" />
        ${parts[1]}
      `
    }
    return title
  }

  render() {
    return html`
      <section id="cases">
        <div class="container">
          <div
            class="hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-900 to-transparent xl:block"
          ></div>
          <div
            class="relative flex rounded-[2rem] from-zinc-950 to-black xl:bg-gradient-to-r 2xl:h-[512px]"
          >
            <div class="hidden w-2/3 justify-center xl:flex">
              <span
                class="absolute bottom-0 left-0 flex gap-2 p-8 font-mono text-[.75rem] font-medium uppercase leading-none text-zinc-600"
              >
                <span> 2025 </span>
                <span> ${i18next.t('cases.project')} </span>
              </span>
              <div class="absolute bottom-0 overflow-hidden">
                <img
                  loading="lazy"
                  class="cases absolute max-w-none"
                  src="${m1}"
                  alt="Dark mode mobile dashboard showing analytics overview with graphs, lead count, and campaign metrics on a tilted iPhone screen."
                />
                <img
                  loading="lazy"
                  class="cases max-w-none"
                  src="${m2}"
                  alt="Mobile screen in dark mode showcasing an organized campaign list view, with project names, dates, and quick actions."
                />
              </div>
            </div>
            <div
              class="mob-cases-content  xl:cases-content relative flex flex-1 flex-col items-center justify-between gap-16 p-16 xl:aspect-square xl:rounded-r-[2rem] xl:py-28 xl:backdrop-blur-sm"
            >
              <h2
                class="text-center text-[2.5rem] leading-none tracking-[-0.04em] text-zinc-200 xl:text-[3em]"
              >
                ${this.renderTitle(i18next.t('cases.title'))}
              </h2>
              <a
                href="/twyne"
                class="flex items-center gap-4 rounded-full bg-zinc-200 py-4 pe-4 ps-6 text-[1rem] font-semibold uppercase leading-none text-black transition-colors duration-500 hover:bg-brand-400"
              >
                ${i18next.t('cases.cta')}
                <svg
                  width="14"
                  height="14"
                  class="rotate-180"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 13L2 6.99999M2 6.99999L8 1M2 6.99999L14 6.99999"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div
            class="hidden h-px w-full bg-gradient-to-r from-transparent via-zinc-900 to-transparent xl:block"
          ></div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
