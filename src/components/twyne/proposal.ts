import i18next from '../../i18n';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// Importação das imagens
import a1 from './imgs/a1.png';
import a2 from './imgs/a2.png';
import a3 from './imgs/a3.png';
import a4 from './imgs/a4.png';
import b1 from './imgs/b1.png';
import b2 from './imgs/b2.png';
import b3 from './imgs/b3.png';
import b4 from './imgs/b4.png';
import b5 from './imgs/b5.png';
import b6 from './imgs/b6.png';
import b7 from './imgs/b7.png';

@customElement('twyne-proposal')
export class TwyneProposal extends LitElement {
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
		const proposalList = i18next.t('twyne.proposal.l1', { returnObjects: true }) as string[];
		return html`
      <section id="proposal">
				<div class="container hidden xl:block h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
				<div class="container bg-zinc-950 rounded-t-[2rem] p-24 2xl:p-32">
					<h2 class="text-[2.5rem] 2xl:text-[3rem] tracking-[-.04em] dark:text-zinc-200 leading-none mb-10">
						${i18next.t('twyne.proposal.t1')}
					</h2>
					<div class="grid grid-cols-2 gap-24">
						<ul class="text-[1rem] 2xl:text-[1.25rem] leading-loose *:before:content-['—'] *:before:text-zinc-500 dark:text-zinc-200 *:before:absolute *:before:-translate-x-[200%] *:relative">
							${proposalList.map(item => html`<li>${item}</li>`)}
						</ul>
						<p class="text-[1rem] 2xl:text-[1.25rem] leading-loose text-balance">
								${i18next.t('twyne.proposal.p1')}
						</p>
					</div>
				</div>
				<div id="components" class="flex relative items-start justify-center gap-4 pb-32 overflow-hidden">
					<style>
						#components img {
							border-radius: .5rem;
						}
					</style>
					<div class="container inset-y-0 absolute bg-gradient-to-b from-zinc-950 to-black -z-10"></div>
					<div class="grid gap-4">
						<img src="${a1}" alt="Component A1">
						<img src="${a2}" alt="Component A2">
						<img src="${a3}" alt="Component A3">
						<img src="${a4}" alt="Component A4">
					</div>
					<div class="flex flex-col gap-4">
						<div class="flex gap-4">
							<div class="flex flex-col gap-4">
								<img src="${b1}" alt="Component B1">
								<img src="${b3}" alt="Component B3">
							</div>
							<img src="${b2}" alt="Component B2">
						</div>
						<img src="${b4}" alt="Component B4">
						<div class="flex gap-4">
							<img src="${b7}" alt="Component B7">
							<img src="${b5}" alt="Component B5">
							<img src="${b6}" alt="Component B6">
						</div>
					</div>
				</div>
				<twyne-impact></twyne-impact>
			</section>
    `;
	}

	createRenderRoot() {
		return this;
	}
} 