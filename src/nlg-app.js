import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-styles/paper-styles.js';
import './nlg-color-picker.js';
import './nlg-size-picker.js';
import { sendEvent } from './analytics';
import { TEMPLATES, getSkeleton } from './templates.js';
import { renderSVG } from './svg-renderer.js';

window.devicePixelRatio = 1;

class NLGApp extends LitElement {
  static get properties() {
    return {
      _size: Object,
      _colors: Array,
      _template: String,
      _showAlphaLayer: Boolean,
    };
  }

  constructor() {
    super();
    this._size = {
      width: 0,
      height: 0,
    };
    this._colors = [];
  }

  _render({ _template, _size, _colors, _showAlphaLayer }) {
    const content = getSkeleton(_template, _size, _colors);
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        paper-dropdown-menu.template-picker {
          width: 18em;
        }
        nlg-color-picker,
        nlg-size-picker {
          display: flex;
        }
        paper-checkbox.show-alpha {
          margin-top: 1em;
        }
        paper-button.download {
          background-color: #fff;
          margin-top: 1em;
        }
        .svg-wrapper {
          display: flex;
          width: fit-content;
        }
        div.show-alpha {
          background-image: url('img/alpha_layer.png');
          background-size: 20px 20px;
          image-rendering: pixelated; /* Chrome and Safari */
          image-rendering: -moz-crisp-edges; /* Firefox */
          -webkit-filter: blur(0px); /* Safari */
        }
        div.svg-wrapper-container {
          border: dashed rgba(0, 0, 0, 0.5) 1px;
          margin: 1em 0;
        }
      </style>
  
      <paper-dropdown-menu class="template-picker" label="Logo Template"
        on-iron-select="${this._onTemplateSelected.bind(this)}">
        <paper-listbox slot="dropdown-content" selected="0">
          ${this._drawTemplateOptions()}
        </paper-listbox>
      </paper-dropdown-menu>
  
      <nlg-size-picker size="${_size}" on-size-changed="${e => this._onSizeChanged(e)}"></nlg-size-picker>
  
      ${this._drawColorPickers(_colors)}  
  
      <paper-checkbox class="show-alpha" checked="${_showAlphaLayer}"
        on-change="${this._onShowLayerChanged.bind(this)}">
        Show opacity (alpha layer) in the preview
      </paper-checkbox>
  
      ${this._drawPreview(_template, _size, _colors, _showAlphaLayer, content)}
    `;
  }

  _drawColorPickers(colors) {
    return colors.map(color => html`
      <nlg-color-picker color="${color}" on-color-changed="${this._onColorChanged.bind(this)}"></nlg-color-picker>
    `);
  }

  _drawTemplateOptions() {
    return Object.keys(TEMPLATES).map(id => html`
      <paper-item id="${id}">${id}</paper-item>
    `);
  }

  _drawPreview(template, size, colors, showAlphaLayer, content) {
    if (!this._validateSize(size) || !this._validateColors(template, colors)) {
      return;
    }
    return html`
      <paper-button class="download" raised on-click="${() => this._download(content)}">Download</paper-button>
      <div class="svg-wrapper-container">
        <div class$="svg-wrapper ${showAlphaLayer ? 'show-alpha' : ''}">${unsafeHTML(content)}</div>
      </div>
    `;
  }

  _validateSize(size) {
    return size && size.width && size.width > 0 && size.height && size.height > 0;
  }

  _validateColor(template, color) {
    return color.fill && !isNaN(color.opacity);
  }

  _validateColors(template, colors) {
    const hasInvalidColor = colors.find(color => !this._validateColor(template, color));
    return !hasInvalidColor;
  }

  _onTemplateSelected(e) {
    this._template = e.detail.item.id;
    const template = TEMPLATES[this._template];
    this._size = Object.assign({}, template.size);
    this._colors = template.colors.slice();
  }

  _onSizeChanged(e) {
    this._size = e.detail.size;
  }

  _onColorChanged(e) {
    const changedColor = Object.assign({}, e.detail.color);
    this._colors = this._colors.map(color => {
      return color.id === changedColor.id ? changedColor : color;
    });
  }

  _onShowLayerChanged(e) {
    this._showAlphaLayer = e.target.checked;
  }

  _download(svg) {
    renderSVG(svg).then(url => {
      const link = document.createElement('a');
      link.setAttribute('hidden', true);
      link.download = `${this._template}-${this._size.height}x${this._size.width}`;
      link.href = url;
      sendEvent('download', {
        'template': this._template,
        'height': this._size.height,
        'width': this._size.width,
      });
      link.click();
    });
  }
}
window.customElements.define('nlg-app', NLGApp);
