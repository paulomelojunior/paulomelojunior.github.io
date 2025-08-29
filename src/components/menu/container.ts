import i18next from '../../i18n'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ThemeMixin } from '../../store/theme'
import home from './home.png'

@customElement('menu-container')
export class MenuContainer extends ThemeMixin(LitElement) {
  @property({ type: Boolean }) more = false
  @property({ type: String }) lang = i18next.language

  constructor() {
    super()
    const savedLang = localStorage.getItem('lang')
    if (savedLang) {
      this.lang = savedLang
      i18next.changeLanguage(savedLang)
    }
  }

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

  changeLang() {
    const currentLang = i18next.language
    const newLang = currentLang === 'en' ? 'pt' : 'en'

    i18next.changeLanguage(newLang)
    localStorage.setItem('lang', newLang)

    // Atualiza a propriedade lang
    this.lang = newLang
  }

  copyEmail() {
    const email = 'hello@pmjr.cc'
    navigator.clipboard
      .writeText(email)
      .then(() => {
        this.updateText(
          this.lang === 'en' ? 'Email copied!' : 'Email copiado!',
          0
        )
      })
      .catch((error) => {
        alert(`Failed to copy email: ${error}`)
      })
  }

  copyEmailReset() {
    this.updateText(this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail', 300)
  }

  updateText(text: string, delay: number) {
    const element = document.querySelector('mail-button span')
    if (element) {
      setTimeout(() => {
        element.textContent = text
      }, delay)
    }
  }

  render() {
    return html`
      <header
        class="absolute inset-x-0 z-40 w-full translate-y-px bg-linear-to-b from-zinc-950 backdrop-blur to-zinc-950/80 xl:fixed"
      >
        <div
          class="pointer-events-none fixed inset-x-0 bottom-12 h-40 bg-linear-to-t from-zinc-950"
        ></div>
        <div class="container grid items-center grid-cols-1 xl:grid-cols-3">
          <mail-button
            @click=${() => this.copyEmail()}
            @mouseleave=${() => this.copyEmailReset()}
            label="hello@pmjr.cc"
            hover="${this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail'}"
            class="hidden xl:flex"
          ></mail-button>
          <div
            class="hidden size-12 p-3 cursor-pointer transition-background duration-500 items-center justify-center *:opacity-75 *:hover:opacity-100 hover:bg-zinc-950 xl:hidden"
          >
            <img
              src="${home}"
              class="transition-opacity duration-500"
              title="Back to homepage"
            />
          </div>
          <nav>
            <ul id="anchors" class="flex justify-end px-0 xl:px-20">
              <li class="flex-1">
                <menu-item
                  href="#section-praxis"
                  label="${i18next.t('menu.praxis')}"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#section-journey"
                  label="${i18next.t('menu.journey')}"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#section-connect"
                  label="${i18next.t('menu.connect')}"
                ></menu-item>
              </li>
              <li class="items-center pe-4 flex xl:hidden">
                <lang-button
                  @click=${() => this.changeLang()}
                  label=${this.lang === 'pt' ? `BR` : `US`}
                  title="${this.lang === 'en'
                    ? 'Mudar para português'
                    : 'Change to english'}"
                ></lang-button>
              </li>
              <li class="hidden items-center pe-4 xl:hidden">
                <button class="menu-toggle">
                  <span>
                    menu
                  </span>
                </button>
              </li>
            </ul>
          </nav>
          <div
            id="copy"
            class="absolute grid-span-2 translate-y-full flex h-12 w-full items-center gap-2 justify-center px-5 font-mono text-[.625rem] font-semibold uppercase xl:hidden bg-zinc-950"
          >
            <span> [c] 2025 pmjr.cc </span>
            <span class="text-zinc-600"> / </span>
            <span> Made by a human being </span>
          </div>
          <div class="hidden xl:flex items-center justify-end gap-2">
            <a class="cta-button py-1.5 px-4 uppercase font-semibold text-[.75rem] tracking-[0.05em]" href="/projects">
              ${i18next.t('featured.button')}
            </a>
            <div class="flex h-12 items-center justify-center px-1 xl:h-12">
              <lang-button
                @click=${() => this.changeLang()}
                label=${this.lang === 'pt' ? `PT · BR` : `EN · US`}
                title="${this.lang === 'en'
                  ? 'Mudar para português'
                  : 'Change to english'}"
              ></lang-button>
            </div>
          </div>
        </div>
      </header>
    `
  }

  createRenderRoot() {
    return this
  }
}
