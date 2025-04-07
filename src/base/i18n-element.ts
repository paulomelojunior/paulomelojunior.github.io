import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import i18next from '../i18n';

/**
 * Classe base para componentes que precisam de suporte a internacionalização.
 * 
 * Esta classe fornece:
 * - Uma propriedade `lang` que reflete o idioma atual
 * - Um método `t()` para acessar traduções
 * - Atualização automática quando o idioma muda
 * 
 * Para usar em um componente:
 * 1. Estenda esta classe: `export class SeuComponente extends I18nElement`
 * 2. Use o método `t()` para traduções: `this.t('chave.subchave')`
 * 3. Para objetos, use a opção `returnObjects`: `this.t('chave', { returnObjects: true })`
 * 
 * Se você armazenar dados traduzidos em propriedades, atualize-os quando o idioma mudar:
 * ```typescript
 * updated(changedProperties: Map<string, any>) {
 *   if (changedProperties.has('lang')) {
 *     // Atualize suas propriedades aqui
 *   }
 * }
 * ```
 */
export class I18nElement extends LitElement {
  @property({ type: String }) lang = i18next.language;

  connectedCallback() {
    super.connectedCallback();
    i18next.on('languageChanged', this._handleLanguageChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    i18next.off('languageChanged', this._handleLanguageChange);
  }

  private _handleLanguageChange = () => {
    this.lang = i18next.language;
    this.requestUpdate();
  }

  /**
   * Obtém uma tradução pelo caminho da chave.
   * 
   * @param key - O caminho da chave de tradução (ex: 'menu.hello')
   * @param options - Opções adicionais para a tradução
   * @param options.returnObjects - Se true, retorna o objeto completo em vez de uma string
   * @returns A tradução ou o objeto traduzido
   */
  t(key: string, options?: { returnObjects?: boolean }) {
    return i18next.t(key, options);
  }
  
  createRenderRoot() {
    return this;
  }
}