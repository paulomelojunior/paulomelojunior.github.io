import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('theme-button')
export class ThemeButton extends LitElement {
	@property({ type: String }) href: string = '';
	@property({ type: String }) label: string = '';
	@property({ type: String }) hover: string = '';

	render() {
		const classList = classNames(
			'hidden xl:flex px-4 gap-2 text-sm uppercase items-center h-8 leading-none rounded-full whitespace-nowrap',
		);

		return html`<button class="menu-item group/item relative ${classList}">
			<div class="${classList} absolute justify-center pointer-events-none inset-0 bg-zinc-100 dark:bg-zinc-900 " aria-hidden="true">
				<span class="text-zinc-800 font-semibold">
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
