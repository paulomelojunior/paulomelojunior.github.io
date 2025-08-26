import i18next from '../../../i18n'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ThemeMixin } from '../../../store/theme'
import goBack from './go-back.png'

@customElement('cases-menu')
export class CasesMenu extends ThemeMixin(LitElement) {
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

  getPreviousPage() {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  render() {

    return html`
      <header
        class="absolute inset-x-0 z-40 hidden w-full bg-linear-to-b from-black backdrop-blur to-black/80 backdrop-saturate-200 xl:fixed xl:block"
      >
        <div class="container grid items-center xl:grid-cols-3">
          <div class="flex items-center">
            <button
              @click=${() => this.getPreviousPage()}
              class="flex size-12 p-3 cursor-pointer transition-background duration-500 items-center justify-center *:opacity-75 *:hover:opacity-100 hover:bg-zinc-950"
              title="Go back homepage"
            >
              <img
                src="${goBack}"
                class="transition-opacity duration-500"
                title="Back to homepage"
              />
            </button>
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
                  href="#goal"
                  label="${i18next.t('twyne.menu.goal')}"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#proposal"
                  label="${i18next.t('twyne.menu.proposal')}"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#impact"
                  label="${i18next.t('twyne.menu.impact')}"
                ></menu-item>
              </li>
              <li class="flex-1">
                <menu-item
                  href="#mobile"
                  label="${i18next.t('twyne.menu.mobile')}"
                ></menu-item>
              </li>
            </ul>
            <div
              id="copy"
              class="absolute flex h-12 w-full items-center justify-center bg-brand-300 px-5 font-mono text-[.625rem] font-semibold uppercase xl:hidden dark:bg-zinc-900"
            >
              <span> Copyright 2025 Paulo Melo Jr. </span>
            </div>
          </nav>
          <div class="flex justify-end">
            <div class="flex items-center justify-center gap-2">
              <a class="cta-button py-1.5 px-4 uppercase font-semibold text-[.75rem] tracking-[0.05em]" href="/projects">
                ${i18next.t('featured.button')}
              </a>
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
