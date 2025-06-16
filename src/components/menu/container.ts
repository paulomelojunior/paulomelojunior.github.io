import i18next from '../../i18n';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('menu-container')
export class MenuContainer extends LitElement {
  @property({ type: Boolean }) more = false;
  @property({ type: String }) lang = i18next.language;
  @property({ type: Boolean }) night = true;

  constructor() {
    super();
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.lang = savedLang;
      i18next.changeLanguage(savedLang);
    }
  }

  // changeTheme() {
  //   this.night = !this.night;
  //   document.documentElement.classList.toggle('dark', this.night);
  //   localStorage.setItem('theme', this.night ? 'dark' : 'light');
  // }

  copyEmail() {
    const email = "hello@pmjr.cc";
    navigator.clipboard.writeText(email).then(() => {
      this.updateText('Copied!', 0);
    }).catch(error => {
      alert(`Failed to copy email: ${error}`);
    });
  }

  copyEmailReset() {
    this.updateText('Click to copy', 300);
  }

  updateText(text: string, delay: number) {
    const element = document.querySelector('theme-button span');
    if (element) {
      setTimeout(() => {
        element.textContent = text;
      }, delay);
    }
  }

  // toggleMore() {
  //   this.more = !this.more;
  // }
  
  // <div class="hidden flex items-center">
  //   <menu-button @click=${() => this.changeLanguage('en')} label="${i18next.t('menu.languages.en')}" ?active=${this.lang === 'en'}></menu-button>
  //   <menu-button @click=${() => this.changeLanguage('pt')} label="${i18next.t('menu.languages.pt')}" ?active=${this.lang === 'pt'}></menu-button>
  // </div>
          // <theme-button
          // @click=${() => this.changeTheme()}
          // label="${(() => {
          //   const hour = new Date().getHours();
          //   if (hour >= 5 && hour < 12) return i18next.t('menu.greetings.morning');
          //   if (hour >= 12 && hour < 18) return i18next.t('menu.greetings.afternoon');
          //   return i18next.t('menu.greetings.night');
          // })()}, ${i18next.t('menu.greetings.boss')}"
          // hover="${this.night ? i18next.t('menu.theme.night') : i18next.t('menu.theme.day')}"	
          // ></theme-button>

  render() {
    return html`
      <header class="invisible w-full absolute inset-x-0 z-40 xl:fixed bg-gradient-to-b from-zinc-950 bg-zinc-950/60 backdrop-blur-md backdrop-saturate-200">
        <div class="container grid xl:grid-cols-2 items-center">
          <mail-button
            @click=${() => this.copyEmail()}
            @mouseleave=${() => this.copyEmailReset()}
            label="hello@pmjr.cc"
            hover="Click to copy"
            ></mail-button>
          <nav>
            <ul id="anchors" class="flex *:flex-1 *:xl:flex-none justify-end">
              <menu-item href="#how" label="${i18next.t('menu.praxis')}"></menu-item>
              <menu-item href="#job" label="${i18next.t('menu.journey')}"></menu-item>
              <menu-item href="#hey" label="${i18next.t('menu.connect')}"></menu-item>
            </ul>
            <div id="copy" class="xl:hidden absolute font-semibold flex items-center justify-center px-5 bg-zinc-900 font-mono uppercase text-[.625rem] tracking-[1px] h-12 w-full">
              <span>
                Copyright 2025 Paulo Melo Jr.
              </span>
            </div>
          </nav>
        </div>
        <div class="hidden xl:block h-px inset-x-0 bg-gradient-to-l via-transparent from-zinc-700"></div>
      </header>
    `;
  }

  createRenderRoot() {
    return this;
  }
}