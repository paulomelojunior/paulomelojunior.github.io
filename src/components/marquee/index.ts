import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './styles.scss';

@customElement('marquee-element')
export class MarqueeElement extends LitElement {
  @property({ type: String }) items: string = '';

  render() {
    const list = this.items.split(',').map(item => item.trim());
    const items = list.map((item) => html`<li>${item}</li><li>✦</li>`);

    return html`
      <div class="marquee">        
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