import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';
// import '../assets/scss/components/button.scss';

@customElement('menu-item')
export class menuItem extends LitElement {
  @property({ type: String }) href: string = '#';
  @property({ type: String }) label: string = 'Anchor';
  @property({ type: Boolean }) isActive: boolean = false;
  
  createRenderRoot() {
    return this;
  }

  render() {
    const classList = classNames('flex items-center font-semibold p-2 uppercase transition text-sm leading-none hover:text-neutral-200 sm:p-4',
      { 'text-neutral-200': this.isActive }
    );

    return html`
      <li>
        <a class="${classList}" href="${this.href}">
          ${this.label}
        </a>
      </li>
    `;
  }
}
