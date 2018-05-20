import { LitElement, html } from '@polymer/lit-element';
import { COLORS } from './colors.js';

class NLGColorPicker extends LitElement {
  _render({ label, fill, opacity }) {
    let selected;
    if (fill) {
      const defaultColor = COLORS.find(color => color.value.toLowerCase() === fill.toLowerCase());
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

    <paper-dropdown-menu label="${label} Color">
      <paper-listbox id="colorList" slot="dropdown-content" selected="${selected}" on-iron-select="${e => this._onColorSelected(e)}">
        ${this._renderDefaultColorOptions()}
        <paper-item disabled>
          <iron-icon class="color-preview" icon="help"></iron-icon>
          Custom
        </paper-item>
      </paper-listbox>
    </paper-dropdown-menu>

    <paper-input class="fill" label="Fill" value="${fill}" on-value-changed="${e => this._onFillChanged(e)}"></paper-input>

    <paper-input class="opacity" label="Opacity" value="${opacity}" type="Number" max="1" min="0" step="0.1" on-value-changed="${e => this._onOpacityChanged(e)}"></paper-input>
`;
  }

  static get properties() {
    return {
      fill: String,
      label: String,
      opacity: Number,
    };
  }

  _renderDefaultColorOptions() {
    return COLORS.map(color => html`
      <paper-item>
        <div class="color-preview" style$="background-color:${color.value}"></div>
        ${color.id}
      </paper-item>
    `);
  }

  _onColorSelected(e) {
    if (e.target.selected === COLORS.length) {
      return;
    }
    this.fill = COLORS[e.target.selected].value;
    this._dispatchColorChangedEvent();
  }

  _onFillChanged(e) {
    if (!e.target.value) {
      return;
    }
    this.fill = e.target.value;
    this._dispatchColorChangedEvent();
  }

  _onOpacityChanged(e) {
    if (!e.target.value) {
      return;
    }
    this.opacity = e.target.value;
    this._dispatchColorChangedEvent();
  }

  _dispatchColorChangedEvent() {
    this.dispatchEvent(new CustomEvent('color-changed', {
      detail: {
        fill: this.fill,
        opacity: this.opacity,
      },
    }));
  }
}
window.customElements.define('nlg-color-picker', NLGColorPicker);
