import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import i18next from '../i18n';

export class I18nElement extends LitElement {
  @property({ type: String }) lang = i18next.language;

  connectedCallback() {
    super.connectedCallback();
    i18next.on('languageChanged', () => {
      this.lang = i18next.language;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    i18next.off('languageChanged', () => {
      this.lang = i18next.language;
    });
  }

  t(key: string, options?: { returnObjects?: boolean }) {
    return i18next.t(key, options);
  }
  
  createRenderRoot() {
    return this;
  }
}