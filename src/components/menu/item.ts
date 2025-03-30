import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('menu-item')
export class MenuItem extends LitElement {
	@property({ type: String }) href: string = '#';
	@property({ type: String }) label: string = '';

	render() {
		const classList = classNames(
			'menu-item flex items-center font-semibold p-2 uppercase transition text-sm leading-none hover:text-neutral-200 sm:p-4',
		);

		return html`<a class="${classList}" href="${this.href}">
        ${this.label}
      </a>`;
	}

	createRenderRoot() {
		return this;
	}
}
