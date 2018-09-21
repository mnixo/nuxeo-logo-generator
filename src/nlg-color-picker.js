import { LitElement, html } from '@polymer/lit-element';
import { COLORS } from './colors';

class NLGColorPicker extends LitElement {
  static get properties() {
    return {
      color: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.color = {
      id: '',
      label: '',
      fill: '',
      opacity: '',
    };
  }

  render() {
    let selected;
    if (this.color.fill) {
      const defaultColor = COLORS.find(color => color.value.toLowerCase() === this.color.fill.toLowerCase());
      selected = defaultColor ? COLORS.indexOf(defaultColor) : COLORS.length;
    }
    return html`
      <style>
        div.color-preview {
          width: 20px;
          height: 20px;
          border: solid black 1px;
          border-radius: 1em;
        }
        .color-preview {
          margin-right: 0.5em;
        }
        paper-dropdown-menu {
          width: 10em;
        }
        paper-input.fill {
          width: 5em;
          margin: 0 1em;
          text-align: center;
        }
        paper-input.opacity {
          width: 3em;
          text-align: center;
        }
      </style>
      
      <paper-dropdown-menu label="${this.color.label} Color"
        .invalid="${this._isFillInvalid(this.color)}" always-float-label>
        <paper-listbox id="colorList" slot="dropdown-content" .selected="${selected}"
        @iron-select="${e => this._onColorSelected(e)}">
          ${this._drawDefaultColorOptions()}
          <paper-item disabled>
            <iron-icon class="color-preview" icon="help"></iron-icon>
            Custom
          </paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
  
      <paper-input class="fill" label="Fill"
        value="${this.color.fill}" .invalid="${this._isFillInvalid(this.color)}"
        @value-changed="${e => this._onFillChanged(e)}" always-float-label>
      </paper-input>
  
      <paper-input class="opacity" label="Opacity" type="Number" max="1" min="0" step="0.1"
        value="${this.color.opacity}" .invalid="${this._isOpacityInvalid(this.color)}"
        @value-changed="${e => this._onOpacityChanged(e)}" always-float-label>
      </paper-input>
    `;
  }

  _drawDefaultColorOptions() {
    return COLORS.map(color => html`
      <paper-item>
        <div class="color-preview" .style="background-color:${color.value}"></div>
        ${color.id}
      </paper-item>
    `);
  }

  _isFillInvalid(color) {
    return !color.fill;
  }

  _isOpacityInvalid(color) {
    return isNaN(parseFloat(color.opacity));
  }

  _onColorSelected(e) {
    if (e.target.selected === COLORS.length) {
      return;
    }
    this.color.fill = COLORS[e.target.selected].value;
    this._dispatchColorChangedEvent();
  }

  _onFillChanged(e) {
    const fill = e.target.value;
    if (fill !== this.color.fill) {
      this.color.fill = fill;
      this._dispatchColorChangedEvent();
    }
  }

  _onOpacityChanged(e) {
    const opacity = e.target.value;
    if (opacity !== this.color.opacity) {
      this.color.opacity = opacity;
      this._dispatchColorChangedEvent();
    }
  }

  _dispatchColorChangedEvent() {
    this.dispatchEvent(new CustomEvent('color-changed', {
      detail: {
        color: this.color,
      },
    }));
  }
}
window.customElements.define('nlg-color-picker', NLGColorPicker);
