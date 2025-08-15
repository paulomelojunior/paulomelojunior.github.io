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

  // firstUpdated() {
  //   gsap.to(this.querySelector('header') as HTMLElement, {
  //     scrollTrigger: {
  //       trigger: 'h1',
  //       start: 'bottom top',
  //       toggleActions: 'play none none reverse',
  //     },
  //     duration: .4,
  //     ease: 'none',
  //     borderColor: 'hsla(0, 0%, 100%, 0.075)',
  //   })
  // }

  render() {
    return html`
      <header
        class="absolute inset-x-0 z-40 w-full translate-y-[1px] bg-black xl:fixed border-b border-transparent"
      >
        <div
          class="pointer-events-none fixed inset-x-0 bottom-12 h-40 bg-gradient-to-t from-black"
        ></div>
        <div class="container grid items-center xl:grid-cols-3">
          <mail-button
            @click=${() => this.copyEmail()}
            @mouseleave=${() => this.copyEmailReset()}
            label="hello@pmjr.cc"
            hover="${this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail'}"
          ></mail-button>
          <nav>
            <ul id="anchors" class="flex justify-end px-0 xl:px-8">
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
              <li class="flex items-center pe-4 xl:hidden">
                <lang-button
                  @click=${() => this.changeLang()}
                  label=${this.lang === 'pt' ? `POR` : `ENG`}
                  title="${this.lang === 'en'
                    ? 'Mudar para português'
                    : 'Change to english'}"
                ></lang-button>
              </li>
            </ul>
            <div
              id="copy"
              class="absolute flex h-12 w-full items-center justify-center bg-stone-300 px-5 font-mono text-[.625rem] font-semibold uppercase xl:hidden dark:bg-zinc-950"
            >
              <span> Copyright 2025 Paulo Melo Jr. </span>
            </div>
          </nav>
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
