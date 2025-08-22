import i18next from '../../i18n'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('projects-fail')
export class ProjectsFail extends LitElement {
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
      <div
        class="hero flex h-dvh flex-col items-center justify-center gap-16 p-8 text-center text-[1.5rem] text-zinc-200 xl:hidden"
      >
        Sorry, this page isn't available <br />
        for small screens yet.
        <a
          href="/"
          class=" flex items-center gap-4 rounded-full bg-zinc-200 py-3 pe-6 ps-4 text-[1rem] font-semibold uppercase leading-none text-black"
        >
          <svg
            width="14"
            height="14"
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
          Go back
        </a>
        <svg
          class="absolute bottom-8 h-12 rotate-[21deg] stroke-zinc-600"
          width="44"
          height="67"
          viewBox="0 0 44 67"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.622 26.2432C21.3514 21.7806 26.8467 14.2637 26.8467 14.2637L24.3142 20.9771C22.2556 25.7528 20.6914 30.708 18.6864 35.4888C16.8732 39.8121 13.9681 45.3093 12.0938 48.2719C10.2195 51.2345 5.20238 56.9493 4.7375 53.4575C4.51176 51.7619 5.98672 46.8824 8.83354 42.6494C11.6804 38.4164 18.3776 29.4011 24.7806 25.0562C32.0957 20.0925 40.026 12.6061 40.6384 8.03106C42.2438 -3.96201 21.0414 0.396133 1.82617 23.5558"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0068 65.5502C25.5655 61.1839 21.8028 42.839 27.25 23.3022C28.2281 19.7942 29.5032 16.2477 31.2288 12.7368C30.2319 15.3528 27.6369 24.4559 30.9257 27.8938C34.2144 31.3317 40.2681 27.7068 42.8838 25.4646"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
