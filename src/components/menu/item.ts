import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('menu-item')
export class MenuItem extends LitElement {
	@property({ type: String }) href: string = '';
	@property({ type: String }) label: string = '';

	render() {
		const beforeClassList = classNames(
			'absolute pointer-events-none flex items-center justify-center inset-0',
		);

		const classList = classNames(
			'menu-item relative tracking-[0.05em] flex items-center justify-center h-12 xl:h-16 px-4 text-[.75rem] xl:text-sm leading-none uppercase',
		);

		return html`<li>
			<a class="${classList}" href="${this.href}">
				<div class="${beforeClassList}" aria-hidden="true">
					<span class="text-zinc-800 font-semibold relative">
						${this.label}
					</span>
				</div>
				${this.label}
			</a>
		</li>`;
	}
	
	createRenderRoot() {
		return this;
	}
}