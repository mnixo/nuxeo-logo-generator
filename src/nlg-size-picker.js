import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class NLGSizePicker extends PolymerElement {
  static get template() {
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

    <paper-input id="height" label="Height" value="{{height}}" type="Number" allowed-pattern="[0-9]" min="[[_min]]" max="[[_max]]" error-message="[[_min]] to [[_max]] pixels">
      <iron-icon slot="prefix" icon="unfold-more"></iron-icon>
      <div slot="suffix">px</div>
    </paper-input>

    <span>x</span>

    <paper-input id="width" label="Width" value="{{width}}" type="Number" allowed-pattern="[0-9]" min="[[_min]]" max="[[_max]]" error-message="[[_min]] to [[_max]] pixels">
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
      height: {
        type: Number,
        notify: true,
        observer: '_validateHeight',
      },
      width: {
        type: Number,
        notify: true,
        observer: '_validateWidth',
      },
      _min: {
        type: Number,
        value: 1,
      },
      _max: {
        type: Number,
        value: 8192,
      }
      // `svg-wrapper` can't download square images larger than 8836x8836 pixels
      // 8192 is just prettier than 8836
    };
  }

  _isValidInput(value) {
    return value >= this._min && value <= this._max;
  }

  _validateHeight() {
    this.$.height.invalid = !this._isValidInput(this.height);
  }

  _validateWidth() {
    this.$.width.invalid = !this._isValidInput(this.width);
  }
}
window.customElements.define(NLGSizePicker.is, NLGSizePicker);
