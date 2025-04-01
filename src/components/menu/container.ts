import i18next from '../../i18n';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('menu-container')
export class MenuContainer extends LitElement {
  render() {
    return html`
      <div class="container flex justify-between items-center">
        <span class="font-medium tracking-wide text-neutral-200 uppercase p-2 sm:p-4 leading-none text-sm relative me-auto">
          <span class="sm:inline hidden">
            ${(() => {
              const hour = new Date().getHours();
              if (hour >= 5 && hour < 12) return i18next.t('menu.greetings.morning');
              if (hour >= 12 && hour < 18) return i18next.t('menu.greetings.afternoon');
              return i18next.t('menu.greetings.night');
            })()}, ${i18next.t('menu.hello')}
          </span>
          ${i18next.t('menu.name')}
        </span>
        <nav class="relative">
          <ul id="anchors" class="flex items-end">
            <menu-item href="#who" label="${i18next.t('menu.who')}"></menu-item>
            <menu-item href="#job" label="${i18next.t('menu.job')}"></menu-item>
            <menu-item href="#hey" label="${i18next.t('menu.hey')}"></menu-item>
          </ul>
        </nav>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}