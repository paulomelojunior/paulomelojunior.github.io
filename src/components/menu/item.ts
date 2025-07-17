import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('menu-item')
export class MenuItem extends LitElement {
	@property({ type: String }) href: string = '';
	@property({ type: String }) label: string = '';

	render() {
		const beforeClassList = classNames(
			'absolute pointer-events-none flex items-center justify-center inset-0 text-stone-200 dark:text-zinc-950 dark:font-semibold',
		);

		const classList = classNames(
			'menu-item relative tracking-[0.05em] flex items-center justify-center h-12  px-4 text-stone-950 dark:text-zinc-50 text-[.75rem]  leading-none uppercase',
		);

		return html`<a class="${classList}" href="${this.href}">
			<div class="${beforeClassList}" aria-hidden="true">
				<span class=" relative">
					${this.label}
				</span>
			</div>
			${this.label}
		</a>`;
	}
	
	createRenderRoot() {
		return this;
	}
}