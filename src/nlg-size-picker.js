import { LitElement, html } from '@polymer/lit-element';

class NLGSizePicker extends LitElement {
  _render({ width, height }) {
    return html`
    <style>
      paper-input {
        width: 8em;
        text-align: center;
      }
      span {
        font-family: 'Roboto', sans-serif;
        margin: 1em 1em 0 1em;
        align-self: center;
      }
    </style>

    <paper-input id="height" label="Height" value="${height}" type="Number" allowed-pattern="[0-9]" min="1"
      on-value-changed="${e => this._setHeight(e)}" invalid="${height < 1}">
      <span slot="prefix"></span>
      <div slot="suffix">px</div>
    </paper-input>

    <span>x</span>

    <paper-input id="width" label="Width" value="${width}" type="Number" allowed-pattern="[0-9]" min="1"
      on-value-changed="${e => this._setWidth(e)}" invalid="${width < 1}">
      <span slot="prefix"></span>
      <div slot="suffix">px</div>
    </paper-input>
`;
  }

  static get is() {
    return 'nlg-size-picker';
  }

  static get properties() {
    return {
      height: Number,
      width: Number,
    };
  }

  _setHeight(e) {
    this.height = e.target.value;
    this._dispatchSizeChanged();
  }

  _setWidth(e) {
    this.width = e.target.value;
    this._dispatchSizeChanged();
  }

  _dispatchSizeChanged() {
    this.dispatchEvent(new CustomEvent('size-changed', {
      detail: {
        width: this.width,
        height: this.height,
      },
    }));
  }
}
window.customElements.define('nlg-size-picker', NLGSizePicker);
