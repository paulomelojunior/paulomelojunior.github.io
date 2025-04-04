import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('menu-item')
export class MenuItem extends LitElement {
	@property({ type: String }) href: string = '';
	@property({ type: String }) label: string = '';
	@property({ type: String }) icon: string = '';

	render() {
		const classList = classNames(
			'menu-item flex items-center font-semibold p-2 uppercase transition text-sm leading-none text-zinc-200 opacity-50 hover:opacity-100 sm:p-4',
		);

		return html`<a class="${classList}" href="${this.href}">
			${this.icon ? html`<i class="flex text-2xl leading-none ph ph-${this.icon}"></i>` : ''}
			${this.label}
		</a>`;
	}

	createRenderRoot() {
		return this;
	}
}
