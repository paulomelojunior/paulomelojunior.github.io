import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('mail-button')
export class MailButton extends LitElement {
	@property({ type: String }) href: string = '';
	@property({ type: String }) label: string = '';
	@property({ type: String }) hover: string = '';

	render() {
		const classList = classNames(
			'hidden xl:flex px-4 gap-2 dark:text-zinc-50 tracking-[0.02em] text-sm uppercase items-center h-8 leading-none rounded-full whitespace-nowrap',
		);

		return html`<button class="menu-item group/item relative ${classList}">
			<div class="${classList} absolute justify-center pointer-events-none inset-0" aria-hidden="true">
				<span class="text-zinc-950 font-semibold">
					${this.hover ? this.hover : this.label}
				</span>
			</div>
			${this.label}
		</button>`;
	}

	createRenderRoot() {
		return this;
	}
}
