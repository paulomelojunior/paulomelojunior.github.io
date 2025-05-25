import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './styles.scss';
import m1 from './mockup-1.png';
import m2 from './mockup-2.png';

@customElement('cases-section')
export class CasesSection extends LitElement {
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
  
  
  render() {
    return html`
      	<div class="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
		<div class="flex relative xl:h-[512px] rounded-[2rem] bg-black">
			<div class="xl:flex hidden justify-center w-2/3">
				<img class="cases absolute bottom-0 saturate-0" src="${m1}">
				<img class="cases absolute bottom-0 saturate-0" src="${m2}">
				<span class="absolute flex gap-2 leading-none font-medium tracking-[1px] bottom-0 left-0 p-8 text-sm text-zinc-600 uppercase font-mono">
					<span class="text-brand-400">
						2025
					</span>
					<span>
						Twyne.io 
					</span>
				</span>
			</div>
			<div class="cases-content flex-1 flex flex-col xl:aspect-square gap-16 p-16 xl:p-28 justify-between items-center relative bg-zinc-400/10  xl:rounded-r-[2rem] backdrop-blur-lg">
				<h2 class="text-[2.5rem] xl:text-[4rem] text-center tracking-[-0.02em] leading-none text-zinc-200">
					Selected <br class="hidden xl:block">
					cases
				</h2>
				<span class="text-brand-400 pt-3 pb-4 px-8 rounded-full text-2xl">
					Maybe soon
				</span>
			</div>
		</div>
		<div class="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}