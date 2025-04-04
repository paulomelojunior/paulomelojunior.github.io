import i18next from '../../i18n';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('menu-container')
export class MenuContainer extends LitElement {
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

  changeLanguage(lang: string) {
    i18next.changeLanguage(lang);
    this.lang = lang;
    localStorage.setItem('lang', lang);
  }

  // toggleMore() {
  //   this.more = !this.more;
  // }

  // ${(() => {
  //   const hour = new Date().getHours();
  //   if (hour >= 5 && hour < 12) return i18next.t('menu.greetings.morning');
  //   if (hour >= 12 && hour < 18) return i18next.t('menu.greetings.afternoon');
  //   return i18next.t('menu.greetings.night');
  // })()},

  render() {
    return html`
      <div class="container flex justify-between items-center relative">
        <span class="font-medium tracking-wide text-zinc-200 uppercase p-2 sm:p-4 leading-none text-sm me-auto">
          ${i18next.t('menu.name')}<span class="sm:inline hidden opacity-50"> ${i18next.t('menu.hello')}</span>
        </span>
        <nav>
          <ul id="anchors" class="flex items-center">
            <menu-item href="#who" label="${i18next.t('menu.who')}"></menu-item>
            <menu-item href="#job" label="${i18next.t('menu.job')}"></menu-item>
            <menu-item href="#hey" label="${i18next.t('menu.hey')}"></menu-item>
          </ul>
        </nav>
        <!-- <div class="flex items-center">
          <menu-button @click=${() => this.changeLanguage('en')} label="${i18next.t('menu.languages.en')}" ?active=${this.lang === 'en'}></menu-button>
          <menu-button @click=${() => this.changeLanguage('pt')} label="${i18next.t('menu.languages.pt')}" ?active=${this.lang === 'pt'}></menu-button>
        </div> -->
        <!-- ${this.more ? html`
          <div class="absolute top-full right-0 bg-zinc-900 rounded-lg">
          </div>
        ` : ''} -->
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}