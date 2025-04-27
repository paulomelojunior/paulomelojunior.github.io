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
			'absolute flex items-center justify-center text-zinc-900 inset-0 bg-brand-400 transition-all duration-300 clip-0',
		);

		const classList = classNames(
			'relative flex items-center justify-center font-[550] h-14 uppercase transition text-sm leading-none active:text-brand-400 hover:text-brand-400',
		);


		return html`<a class="${classList}" href="${this.href}">
			<div class="${beforeClassList}">
				${this.label}
			</div>
			${this.icon ? html`<i class="flex text-2xl leading-none ph ph-${this.icon}"></i>` : ''}
			${this.label}
		</a>`;
	}

	createRenderRoot() {
		return this;
	}
}
