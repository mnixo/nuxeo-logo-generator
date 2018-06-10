import { LitElement, html } from '@polymer/lit-element';

class NLGSizePicker extends LitElement {
  static get properties() {
    return {
      size: Object,
    };
  }

  constructor() {
    super();
    this._setSize(0, 0);
  }

  _render({ size }) {
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
  
      <paper-input id="height" label="Height" value="${size.height}" type="Number" allowed-pattern="[0-9]" min="1"
        on-value-changed="${e => this._onHeightChanged(e)}" invalid="${size.height < 1}">
        <span slot="prefix"></span>
        <div slot="suffix">px</div>
      </paper-input>
  
      <span>x</span>
  
      <paper-input id="width" label="Width" value="${size.width}" type="Number" allowed-pattern="[0-9]" min="1"
        on-value-changed="${e => this._onWidthChanged(e)}" invalid="${size.width < 1}">
        <span slot="prefix"></span>
        <div slot="suffix">px</div>
      </paper-input>
    `;
  }

  _dispatchSizeChangedEvent() {
    this.dispatchEvent(new CustomEvent('size-changed', {
      detail: {
        size: this.size,
      },
    }));
  }

  _onHeightChanged(e) {
    let height = parseInt(e.target.value);
    height = isNaN(height) ? null : height;
    if (this.size.height !== height) {
      this._setSize(this.size.width, height);
      this._dispatchSizeChangedEvent();
    }
  }

  _onWidthChanged(e) {
    let width = parseInt(e.target.value);
    width = isNaN(width) ? null : width;
    if (this.size.width !== width) {
      this._setSize(width, this.size.height);
      this._dispatchSizeChangedEvent();
    }
  }

  _setSize(width, height) {
    this.size = {
      width,
      height,
    };
  }
}
window.customElements.define('nlg-size-picker', NLGSizePicker);
