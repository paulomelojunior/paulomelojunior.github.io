import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import classNames from 'classnames'
import './styles.scss'

@customElement('progressive-blur')
export class ProgressiveBlur extends LitElement {
  @property({ type: String }) custom: string = ''

  render() {
    const classList = classNames('progressive-blur', this.custom)

    return html`
      <div class=${classList}>
        ${Array.from({ length: 6 }, () => html`<div></div>`)}
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
