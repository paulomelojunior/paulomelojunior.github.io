import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('menu-item')
export class MenuItem extends LitElement {
	@property({ type: String }) href: string = '';
	@property({ type: String }) label: string = '';
	@property({ type: String }) icon: string = '';

	render() {
		const beforeClassList = classNames(
			'absolute pointer-events-none flex items-center justify-center inset-0',
		);

		const classList = classNames(
			'menu-item relative flex items-center justify-center h-12 xl:h-16 px-4 text-[.75rem] xl:text-sm leading-none uppercase',
		);

		return html`<a class="${classList}" href="${this.href}">
			<div class="${beforeClassList}" aria-hidden="true">
				<i class="absolute hidden text-7xl leading-none ph ph-${this.icon}"></i>
				<span class="text-zinc-800 font-semibold relative">
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

// ${this.icon ? html`<i class="flex text-2xl leading-none ph ph-${this.icon}"></i>` : ''}