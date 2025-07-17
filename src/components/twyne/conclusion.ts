import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('twyne-conclusion')
export class TwyneConclusion extends LitElement {
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
      <p>${i18next.t('twyne.conclusion.p1')}</p>
      <p>${i18next.t('twyne.conclusion.p2')}</p>
      <p>${i18next.t('twyne.conclusion.p3')}</p>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 