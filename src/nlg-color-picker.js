import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import './nlg-colors.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class NLGColorPicker extends PolymerElement {
  static get template() {
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

    <paper-dropdown-menu label="[[label]] Color">
      <paper-listbox id="colorList" slot="dropdown-content" selected="{{_selected}}">
        <template is="dom-repeat" items="[[_getColors()]]">
          <paper-item>
            <div class="color-preview" style\$="background-color:[[item.value]];"></div>
            [[item.id]]
          </paper-item>
        </template>
        <paper-item disabled="">
          <iron-icon class="color-preview" icon="help"></iron-icon>
          Custom
        </paper-item>
      </paper-listbox>
    </paper-dropdown-menu>

    <paper-input class="fill" label="Fill" value="{{fill}}"></paper-input>

    <paper-input class="opacity" label="Opacity" value="{{opacity}}" type="Number" max="1" min="0" step="0.1">
    </paper-input>

    <nlg-colors id="colors"></nlg-colors>
`;
  }

  static get is() {
    return 'nlg-color-picker';
  }

  static get properties() {
    return {
      fill: {
        type: String,
        notify: true,
        observer: '_onFillChange',
      },
      label: String,
      opacity: {
        type: Number,
        notify: true,
      },
      _selected: {
        type: Number,
        observer: '_onSelectedChange',
      }
    };
  }

  _getColors() {
    return this.$.colors.getAll();
  }

  _onFillChange() {
    const colors = this._getColors();
    const defaultColor = colors.find(color => color.value.toLowerCase() === this.fill.toLowerCase());
    this.$.colorList.selected = defaultColor ? colors.indexOf(defaultColor) : colors.length;
  }

  _onSelectedChange() {
    const colors = this._getColors();
    if (this._selected === colors.length) {
      return;
    }
    this.fill = colors[this._selected].value;
  }
}
window.customElements.define(NLGColorPicker.is, NLGColorPicker);
