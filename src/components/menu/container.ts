import i18next from '../../i18n';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemeMixin } from '../../store/theme';

@customElement('menu-container')
export class MenuContainer extends ThemeMixin(LitElement) {
  @property({ type: Boolean }) more = false;
  @property({ type: String }) lang = i18next.language;

  constructor() {
    super();
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.lang = savedLang;
      i18next.changeLanguage(savedLang);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    i18next.on('languageChanged', this.handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    i18next.off('languageChanged', this.handleLanguageChange);
  }

  private handleLanguageChange = () => {
    this.lang = i18next.language;
  };

  changeLang() {
    const currentLang = i18next.language;
    const newLang = currentLang === 'en' ? 'pt' : 'en';
    
    i18next.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
    
    // Atualiza a propriedade lang
    this.lang = newLang;
  }

  changeTheme() {
    this.toggleTheme();
  }

  copyEmail() {
    const email = "hello@pmjr.cc";
    navigator.clipboard.writeText(email).then(() => {
      this.updateText(this.lang === 'en' ? 'Copied!' : 'Copiado!', 0);
    }).catch(error => {
      alert(`Failed to copy email: ${error}`);
    });
  }

  copyEmailReset() {
    this.updateText(this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail', 300);
  }

  updateText(text: string, delay: number) {
    const element = document.querySelector('mail-button span');
    if (element) {
      setTimeout(() => {
        element.textContent = text;
      }, delay);
    }
  }

  render() {
    return html`
      <header class="invisible w-full absolute inset-x-0 z-40 xl:fixed bg-gradient-to-b from-stone-200 bg-stone-200/60 dark:from-zinc-950 dark:bg-zinc-950/60 backdrop-blur-md backdrop-saturate-200">
        <div class="container grid xl:grid-cols-2 items-center">
          <mail-button
            @click=${() => this.copyEmail()}
            @mouseleave=${() => this.copyEmailReset()}
            label="hello@pmjr.cc"
            hover="${this.lang === 'en' ? 'Click to copy' : 'Copiar e-mail'}"
            ></mail-button>
          <nav>
            <ul id="anchors" class="flex justify-end">
              <li class="flex-1 xl:flex-none">
                <menu-item href="#how" label="${i18next.t('menu.praxis')}"></menu-item>
              </li>
              <li class="flex-1 xl:flex-none">
                <menu-item href="#job" label="${i18next.t('menu.journey')}"></menu-item>
              </li>
              <li class="flex-1 xl:flex-none">
                <menu-item href="#hey" label="${i18next.t('menu.connect')}"></menu-item>
              </li>
              <li class="hidden items-center justify-center size-12 xl:size-16">
                <theme-button
                  @click=${() => this.changeTheme()}  
                  icon="circle-half-tilt"
                  classNames=${this.dark ? '' : 'rotate-180'}
                ></theme-button>
              </li>
              <li class="flex items-center justify-center size-12 xl:size-16">
                <lang-button
                  @click=${() => this.changeLang()}  
                  label=${this.lang === 'pt' ? 'EN' : 'PT'}
                  title="${this.lang === 'en' ? 'Mudar para Português' : 'Change to English'}"
                ></lang-button>
              </li>
            </ul>
            <div id="copy" class="xl:hidden absolute font-semibold flex items-center justify-center px-5 bg-stone-300 dark:bg-zinc-900 font-mono uppercase text-[.625rem] tracking-[1px] h-12 w-full">
              <span>
                Copyright 2025 Paulo Melo Jr.
              </span>
            </div>
          </nav>
        </div>
        <div class="hidden xl:block h-px inset-x-0 bg-gradient-to-l via-transparent from-stone-300 dark:from-zinc-900"></div>
      </header>
    `;
  }

  createRenderRoot() {
    return this;
  }
}