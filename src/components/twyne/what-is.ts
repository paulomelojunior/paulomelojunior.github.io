import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('twyne-what-is')
export class TwyneWhatIs extends LitElement {
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
      <div class="xl:p-16 flex flex-col bg-black">
        <h2 class="text-[3rem] tracking-[-.04em] dark:text-zinc-200 leading-none mb-12">
          ${i18next.t('twyne.whatIs.t1')}
        </h2>
        <p class="text-[1.25rem] leading-loose">
          ${unsafeHTML(i18next.t('twyne.whatIs.p1'))}
        </p>
        <!-- Adicione aqui a lista fixa de indústria/produto/contribuições se necessário -->
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 