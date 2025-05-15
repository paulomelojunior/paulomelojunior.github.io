import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('menu-button')
export class MenuButton extends LitElement {
	@property({ type: String }) href: string = '';
	@property({ type: String }) label: string = '';
	@property({ type: String }) hover: string = '';
	@property({ type: String }) icon: string = '';
	@property({ type: Boolean }) active: boolean = false;

	render() {
		const classList = classNames(
			'flex gap-2 text-sm uppercase items-center h-8 leading-none rounded-full whitespace-nowrap',
			{
				'px-4': !this.icon,
				'ps-1.5 pe-4': this.icon,
			}
		);

		return html`<button class="menu-item group/item relative ${classList}">
			<div class="${classList} absolute pointer-events-none inset-0 dark:bg-zinc-900" aria-hidden="true">
				<span>
					Theme
				</span>
				<span>
					${this.hover ? this.hover : this.label}
				</span>
			</div>
			${this.icon ? html`
				<i class="leading-none transition-all rounded-full group-hover/item:rotate-180 duration-500 group-hover/item:bg-brand-400 group-hover/item:text-zinc-900 ph-fill text-[1.25rem] ph-${this.icon}"></i>
			` : ''}
			${this.label}
		</button>`;
	}

	createRenderRoot() {
		return this;
	}
}
