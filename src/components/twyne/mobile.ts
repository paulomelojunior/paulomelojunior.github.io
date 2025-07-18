import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import e1 from './imgs/e1.png';
import e2 from './imgs/e2.png';
import e3 from './imgs/e3.png';
import e4 from './imgs/e4.png';
import e5 from './imgs/e5.png';
import mask from './imgs/mask.png';

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
      <section id="mobile" class="py-32 mt-32">
				<h2 class="text-[2.5rem] 2xl:text-[3rem] tracking-[-.04em] dark:text-zinc-200 leading-none text-center mb-32">
          ${unsafeHTML(i18next.t('twyne.mobile.t1'))}
				</h2>
				<style>
					#mobile img {
						mask-image: url('${mask}');
						mask-mode: luminance;
					}
				</style>
				<div class="flex gap-4 items-center justify-center overflow-hidden">
					<img src="${e2}" class="hover:opacity-100 transition-opacity duration-500 opacity-20">
					<img src="${e1}" class="hover:opacity-100 transition-opacity duration-500 opacity-40">
					<img src="${e3}" class="hover:opacity-100 transition-opacity duration-500 opacity-80">
					<img src="${e4}" class="hover:opacity-100 transition-opacity duration-500 opacity-40">
					<img src="${e5}" class="hover:opacity-100 transition-opacity duration-500 opacity-20">
				</div>
			</section>
    `;
  }

  createRenderRoot() {
    return this;
  }
} 