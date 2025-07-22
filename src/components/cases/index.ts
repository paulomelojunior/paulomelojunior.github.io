import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import m1 from './mockup-1.png';
import m2 from './mockup-2.png';

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
			<div class="container">
			<div class="hidden xl:block h-px w-full bg-gradient-to-r from-transparent via-zinc-900 to-transparent"></div>
			  <div class="flex relative 2xl:h-[512px] rounded-[2rem] xl:bg-gradient-to-r from-zinc-950 to-black">
				  <div class="xl:flex hidden justify-center w-2/3">
						<div class="absolute overflow-hidden bottom-0 saturate-0">
							<img class="cases max-w-none absolute" src="${m1}" alt="Dark mode mobile dashboard showing analytics overview with graphs, lead count, and campaign metrics on a tilted iPhone screen.">
							<img class="cases max-w-none" src="${m2}" alt="Mobile screen in dark mode showcasing an organized campaign list view, with project names, dates, and quick actions.">
						</div>
						<span class="absolute flex gap-2 leading-none font-medium tracking-[.5px] bottom-0 left-0 p-8 text-sm text-zinc-600 uppercase font-mono">
							<span>
								2025
							</span>
							<span>
								${i18next.t('cases.project')}
							</span>
					  	</span>
				  </div>
				  <div class="mob-cases-content  xl:cases-content flex-1 flex flex-col xl:aspect-square gap-16 p-16 xl:py-28 justify-between items-center relative xl:rounded-r-[2rem] xl:backdrop-blur-sm">
					<h2 class="text-[2.5rem] xl:text-[3em] text-center tracking-[-0.04em] leading-none text-zinc-200">
						${this.renderTitle(i18next.t('cases.title'))}
					</h2>
					<a href="/twyne" class="flex items-center uppercase font-semibold text-[1rem] leading-none gap-4 py-4 pe-4 ps-6 rounded-full bg-zinc-200 hover:bg-brand-400 transition-colors duration-500 text-black">
						${i18next.t('cases.cta')}
						<svg width="14" height="14" class="rotate-180" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 13L2 6.99999M2 6.99999L8 1M2 6.99999L14 6.99999" stroke="black" stroke-width="2"/>
						</svg>
					</a>
				  </div>
			  </div>
			  <div class="hidden xl:block h-px w-full bg-gradient-to-r from-transparent via-zinc-900 to-transparent"></div>
			</div>
		</section>
    `;
	}

	createRenderRoot() {
		return this;
	}
}