import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import classNames from 'classnames'


@customElement('progressive-blur')
export class ProgressiveBlur extends LitElement {
  @property({ type: String }) classNames: string = ''

  render() {
    const baseClasses = 'progressive-blur'
    const blurClasses = classNames(baseClasses, this.classNames)

    return html`
      <div class=${blurClasses}>
        ${Array.from({ length: 6 }, () => html`<div></div>`)}
      </div>
    `
  }

  createRenderRoot() {
    return this
  }
}
