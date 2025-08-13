import i18next from '../../../i18n'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ThemeMixin } from '../../../store/theme'
import goBack from './go-back.svg'

@customElement('archive-menu')
export class ArchiveMenu extends ThemeMixin(LitElement) {
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

  changeTheme() {
    this.toggleTheme()
  }

  copyEmail() {
    const email = 'hello@pmjr.cc'
    navigator.clipboard
      .writeText(email)
      .then(() => {
        this.updateText(this.lang === 'en' ? 'Copied!' : 'Copiado!', 0)
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
        class="absolute inset-x-0 z-40 hidden w-full bg-stone-200/60 bg-gradient-to-b backdrop-blur-md backdrop-saturate-200 xl:fixed xl:block dark:bg-black"
      >
        <div class="container grid items-center xl:grid-cols-3">
          <div class="flex items-center">
            <a
              href="/"
              class="flex size-12 cursor-pointer items-center justify-center *:opacity-50 *:hover:opacity-100"
              title="Go back homepage"
            >
              <img
                src="${goBack}"
                class="transition-all duration-500"
                title="Back to homepage"
              />
            </a>
            <mail-button
              @click=${() => this.copyEmail()}
              @mouseleave=${() => this.copyEmailReset()}
              label="hello@pmjr.cc"
              hover="${this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail'}"
            ></mail-button>
          </div>
          <nav>
            <ul id="anchors" class="flex justify-evenly">
              <li class="flex-1">
                <menu-item
                  href="#ifficient"
                  label="Ifficient"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#allugator"
                  label="Allugator"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#multiplayer"
                  label="Multiplayer"
                ></menu-item>
              </li>
            </ul>
            <div
              id="copy"
              class="absolute flex h-12 w-full items-center justify-center bg-stone-300 px-5 font-mono text-[.625rem] font-semibold uppercase xl:hidden dark:bg-zinc-900"
            >
              <span> Copyright 2025 Paulo Melo Jr. </span>
            </div>
          </nav>
          <div class="flex justify-end">
            <div class="flex items-center justify-center">
              <div class="flex h-12 items-center justify-center px-1">
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
        </div>
      </header>
    `
  }

  createRenderRoot() {
    return this
  }
}
