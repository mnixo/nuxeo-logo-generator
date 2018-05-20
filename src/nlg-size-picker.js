import { LitElement, html } from '@polymer/lit-element';

const MIN = 1;
const MAX = 8192;

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

    <paper-input id="height" label="Height" value="${height}" type="Number" allowed-pattern="[0-9]" min="${MIN}" max="${MAX}" error-message="${MIN} to ${MAX} pixels"
      on-value-changed="${e => this._setHeight(e)}" invalid="${height < MIN || height > MAX}">
      <iron-icon slot="prefix" icon="unfold-more"></iron-icon>
      <div slot="suffix">px</div>
    </paper-input>

    <span>x</span>

    <paper-input id="width" label="Width" value="${width}" type="Number" allowed-pattern="[0-9]" min="${MIN}" max="${MAX}" error-message="${MIN} to ${MAX} pixels"
      on-value-changed="${e => this._setWidth(e)}" invalid="${width < MIN || width > MAX}">
      <iron-icon slot="prefix" icon="code"></iron-icon>
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
      // `svg-wrapper` can't download square images larger than 8836x8836 pixels
      // 8192 is just prettier than 8836
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
