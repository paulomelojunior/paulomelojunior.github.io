import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('twyne-mobile')
export class TwyneMobile extends LitElement {
  @property({ type: String }) lang = i18next.language;

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

  render() {
    return html`
      <h2 class="text-[3rem] tracking-[-.04em] dark:text-zinc-200 leading-[3.5rem] text-center mb-32">
        ${unsafeHTML(i18next.t('twyne.mobile.t1'))}
      </h2>
      <slot></slot>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 