import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import m1 from './mockup-1.webp'
import m2 from './mockup-2.webp'

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
      <section id="cases" class="hidden xl:block">
        <div class="container">
          <div
            class="hidden h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
          <div
            class="to-zinc-black relative flex rounded-4xl from-zinc-950 xl:bg-linear-to-r 2xl:h-[512px]"
          >
            <div class="hidden w-2/3 justify-center xl:flex">
              <span
                class="absolute bottom-0 left-0 flex gap-2 p-8 font-mono text-[.75rem] font-medium uppercase leading-none tracking-[.05em] text-zinc-700"
              >
                2025 ${i18next.t('cases.project')}
              </span>
              <div class="absolute bottom-0 overflow-hidden pointer-events-none">
                <img
                  loading="lazy"
                  class="cases absolute w-[calc(1264px*0.8)] max-w-none drop-shadow-[0_5rem_5rem_black] 2xl:w-auto"
                  src="${m1}"
                  width="1264"
                  height="720"
                  alt="Dark mode mobile dashboard showing analytics overview with graphs, lead count, and campaign metrics on a tilted iPhone screen."
                />
                <img
                  loading="lazy"
                  class="cases w-[calc(1264px*0.8)] max-w-none drop-shadow-[0_5rem_5rem_black] 2xl:w-auto"
                  src="${m2}"
                  width="1264"
                  height="720"
                  alt="Mobile screen in dark mode showcasing an organized campaign list view, with project names, dates, and quick actions."
                />
              </div>
            </div>
            <div
              class="mob-cases-content xl:cases-content relative flex flex-1 flex-col p-20 text-center xl:aspect-square xl:rounded-r-4xl xl:backdrop-blur-sm 2xl:p-24"
            >
              <h2
                class="text-[2.5rem] leading-none tracking-[-0.04em] text-zinc-200 2xl:text-[3rem]"
              >
                ${this.renderTitle(i18next.t('cases.title'))}
              </h2>
              <p
                class="mb-auto mt-8 text-pretty text-sm/loose 2xl:text-base/loose"
              >
                ${i18next.t('cases.description')}
              </p>
              <a
                href="/twyne"
                class="cta-button flex items-center gap-3 self-center ps-6"
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
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div
            class="hidden h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent xl:block"
          ></div>
        </div>
      </section>
    `
  }

  createRenderRoot() {
    return this
  }
}
