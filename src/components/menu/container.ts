import i18next from '../../i18n'
import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ThemeMixin } from '../../store/theme'

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

  changeTheme() {
    this.toggleTheme()
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
        class="invisible absolute translate-y-[1px] inset-x-0 z-40 w-full bg-stone-200/60 bg-gradient-to-b backdrop-blur-md backdrop-saturate-200 xl:fixed dark:bg-zinc-950"
      >
        <div class="fixed bottom-10 inset-x-0 h-40 bg-gradient-to-t from-zinc-950">
        </div>
        <div class="container grid items-center xl:grid-cols-2">
          <mail-button
            @click=${() => this.copyEmail()}
            @mouseleave=${() => this.copyEmailReset()}
            label="hello@pmjr.cc"
            hover="${this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail'}"
          ></mail-button>
          <nav>
            <ul id="anchors" class="flex justify-end">
              <li class="flex-1 xl:flex-none">
                <menu-item
                  href="#how"
                  label="${i18next.t('menu.praxis')}"
                ></menu-item>
              </li>
              <li class="flex-1 xl:flex-none">
                <menu-item
                  href="#journey"
                  label="${i18next.t('menu.journey')}"
                ></menu-item>
              </li>
              <li class="flex-1 xl:flex-none">
                <menu-item
                  href="#hey"
                  label="${i18next.t('menu.connect')}"
                ></menu-item>
              </li>
              <li class="flex h-10 xl:h-12 items-center justify-center px-1">
                <lang-button
                  @click=${() => this.changeLang()}
                  label=${this.lang === 'pt' ? 'EN · US' : 'PT · BR'}
                  title="${this.lang === 'en'
                    ? 'Mudar para português'
                    : 'Change to english'}"
                ></lang-button>
              </li>
            </ul>
            <div
              id="copy"
              class="absolute flex h-10 w-full items-center justify-center bg-stone-300 px-5 font-mono text-[.625rem] font-semibold uppercase xl:hidden dark:bg-zinc-900"
            >
              <span> Copyright 2025 Paulo Melo Jr. </span>
            </div>
          </nav>
        </div>
      </header>
    `
  }

  createRenderRoot() {
    return this
  }
}
