import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';

@customElement('theme-button')
export class ThemeButton extends LitElement {
	@property({ type: String }) classNames = '';
	@property({ type: String }) icon = '';

	render() {
		const baseClasses = 'relative tracking-[0.05em] flex items-center transition-all justify-center size-8 hover:size-10 rounded-full hover:bg-stone-950 dark:hover:bg-zinc-200 hover:text-stone-950 dark:hover:text-zinc-200';
		const buttonClasses = classNames(baseClasses, this.classNames);

		return html`
			<button class="${buttonClasses}">
				<i class="ph-fill ph-${this.icon} bg-stone-200 dark:bg-zinc-950 rounded-full text-[1.25rem]"></i>
			</button>
		`;
	}

	createRenderRoot() {
		return this;
	}
}
