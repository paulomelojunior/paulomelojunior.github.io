import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('twyne-impact')
export class TwyneImpact extends LitElement {
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
    const items = i18next.t('twyne.impact.l1', { returnObjects: true }) as string[];
    return html`
      <div id="impact" class="container p-24 2xl:p-32 grid grid-cols-2 items-baseline rounded-b-[2rem] bg-black">
        <h2 class="text-[2.5rem] 2xl:text-[3rem] tracking-[-.04em] dark:text-zinc-200 leading-none mb-10">
          ${i18next.t('twyne.impact.t1')}
        </h2>
        <ul class="text-[1rem] 2xl:text-[1.25rem] leading-loose *:before:content-['—'] *:before:text-zinc-500 dark:text-zinc-200 *:before:absolute *:before:-translate-x-[200%] *:relative">
          ${items.map(item => html`<li>${item}</li>`)}
        </ul>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 