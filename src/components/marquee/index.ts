import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import classNames from 'classnames';
import star from './star.svg';
import './styles.scss';

@customElement('marquee-element')
export class MarqueeElement extends LitElement {
  @property({ type: String }) items: string = '';
  @property({ type: Boolean }) reverse: boolean = false;
  
  render() {
    const list = this.items.split(',').map(item => item.trim());
    const items = list.map((item) => html`<li>${item}</li><li><img class="size-4" src="${star}" /></li>`);
    const reverse = this.reverse;
    const classList = classNames('marquee', { reverse });

    return html`
      <div class=${classList}>        
        <ul class="marquee__content">
          ${items}
        </ul>
        <ul class="marquee__content">
          ${items}
        </ul>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}