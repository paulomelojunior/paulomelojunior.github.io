import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('menu-button')
export class MenuButton extends LitElement {
	@property({ type: String }) href: string = '';
	@property({ type: String }) label: string = '';
	@property({ type: String }) icon: string = '';
	@property({ type: Boolean }) active: boolean = false;

	render() {
		const classList = classNames(
			'menu-item flex items-center font-semibold p-2 uppercase transition text-sm leading-none hover:text-zinc-600 sm:p-4',
		);

		return html`<button class="${classList} ${this.active ? 'text-zinc-500' : 'text-zinc-600'}">
			${this.icon ? html`<i class="flex text-lg leading-none ph ph-${this.icon}"></i>` : ''}
			${this.label}
		</button>`;
	}

	createRenderRoot() {
		return this;
	}
}
