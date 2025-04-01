import i18next from '../../i18n';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('menu-container')
export class MenuContainer extends LitElement {
  @property({ type: Boolean }) more = false;
  @property({ type: String }) lang = i18next.language;

  constructor() {
    super();
  }

  changeLanguage(lang: string) {
    i18next.changeLanguage(lang);
    this.lang = lang;
    this.requestUpdate();
  }

  toggleMore() {
    this.more = !this.more;
  }

  render() {
    return html`
      <div class="container flex justify-between items-center relative">
        <span class="font-medium tracking-wide text-neutral-200 uppercase p-2 sm:p-4 leading-none text-sm me-auto">
          <span class="sm:inline hidden">
            <!-- ${(() => {
              const hour = new Date().getHours();
              if (hour >= 5 && hour < 12) return i18next.t('menu.greetings.morning');
              if (hour >= 12 && hour < 18) return i18next.t('menu.greetings.afternoon');
              return i18next.t('menu.greetings.night');
            })()}, -->
            ${i18next.t('menu.hello')}
          </span>
          ${i18next.t('menu.name')}
        </span>
        <div class="flex">
          <button @click=${() => this.changeLanguage('en')} class="text-neutral-200 uppercase p-2 sm:p-4 leading-none text-sm">
            ${i18next.t('menu.languages.en')}
          </button>
          <button @click=${() => this.changeLanguage('pt')} class="text-neutral-200 uppercase p-2 sm:p-4 leading-none text-sm">
            ${i18next.t('menu.languages.pt')}
          </button>
        </div>
        <nav>
          <ul id="anchors" class="flex items-end">
            <menu-item href="#who" label="${i18next.t('menu.who')}"></menu-item>
            <menu-item href="#job" label="${i18next.t('menu.job')}"></menu-item>
            <menu-item href="#hey" label="${i18next.t('menu.hey')}"></menu-item>
            <menu-item @click=${(e: Event) => { e.preventDefault(); this.toggleMore(); }} label="${i18next.t('menu.more')}"></menu-item>
          </ul>
          ${this.more ? html`
            <div class="absolute top-full left-0 bg-neutral-900 w-full">
              <menu-item href="/stack" label="${i18next.t('menu.stack')}"></menu-item>
              <menu-item href="/drafts" label="${i18next.t('menu.drafts')}"></menu-item>
            </div>
          ` : ''}
        </nav>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}