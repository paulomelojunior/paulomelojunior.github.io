import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import m1 from './mockup-1.webp';
import m2 from './mockup-2.webp';

@customElement('cases-section')
export class CasesSection extends LitElement {
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

	private renderTitle(title: string) {
		const parts = title.split('<br class=\'block xl:hidden\'>');
		if (parts.length > 1) {
			return html`
				${parts[0]}
				<br class="block xl:hidden">
				${parts[1]}
			`;
		}
		return title;
	}

	render() {
		return html`
		<section id="cases">
			<div class="container xl:py-16">
			<div class="hidden xl:block h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
			  <div class="flex relative 2xl:h-[512px] rounded-[2rem] xl:bg-black">
				  <div class="xl:flex hidden justify-center w-2/3">
					  <img class="cases absolute bottom-0" src="${m1}" alt="Dark mode mobile dashboard showing analytics overview with graphs, lead count, and campaign metrics on a tilted iPhone screen.">
					  <img class="cases absolute bottom-0" src="${m2}" alt="Mobile screen in dark mode showcasing an organized campaign list view, with project names, dates, and quick actions.">
					  <span class="absolute flex gap-2 leading-none font-medium tracking-[.5px] bottom-0 left-0 p-8 text-sm text-zinc-600 uppercase font-mono">
						  <span>
							  2025
						  </span>
						  <span>
							  ${i18next.t('cases.project')}
						  </span>
					  </span>
				  </div>
				  <div class="mob-cases-content  xl:cases-content flex-1 flex flex-col xl:aspect-square gap-16 p-16 xl:p-28 justify-between items-center relative xl:rounded-r-[2rem] xl:backdrop-blur-sm">
					<h2 class="text-[2.5rem] xl:text-[3.5rem] 2xl:text-[4rem] text-center tracking-[-0.02em] leading-none text-zinc-200">
						${this.renderTitle(i18next.t('cases.title'))}
					</h2>
					<span class="text-brand-400 text-xl">
						${i18next.t('cases.subtitle')}
					</span>
				  </div>
			  </div>
			  <div class="hidden xl:block h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
			</div>
		</section>
    `;
	}

	createRenderRoot() {
		return this;
	}
}