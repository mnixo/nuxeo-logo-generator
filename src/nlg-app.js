import { LitElement, html } from '@polymer/lit-element';
import { unsafeHTML } from 'lit-html/lib/unsafe-html';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/social-icons';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-toast/paper-toast';
import '@polymer/paper-styles/paper-styles';
import './nlg-color-picker';
import './nlg-randomizer';
import './nlg-router';
import './nlg-size-picker';
import { sendEvent } from './analytics';
import { COLORS } from './colors';
import { TEMPLATES, getRenderableTemplate } from './templates';
import { renderSVG } from './svg-renderer';

window.devicePixelRatio = 1;

class NLGApp extends LitElement {
  static get properties() {
    return {
      _size: Object,
      _colors: Array,
      _templateId: String,
      _showAlphaLayer: Boolean,
      _updateRouting: Boolean,
    };
  }

  constructor() {
    super();
    this._size = {
      width: 0,
      height: 0,
    };
    this._colors = [];
    this._showAlphaLayer = true;
    this._updateRouting = true;
  }

  _firstRendered() {
    const params = this.shadowRoot.getElementById('router').getQueryParams();
    if (params.template) {
      const template = TEMPLATES.find(t => t.id === params.template);
      if (template) {
        this._templateId = params.template;
        this.shadowRoot.getElementById('template-listbox').selected = TEMPLATES.indexOf(template);
        this._size = params.size;
        this._colors = params.colors;
      }
    } else {
      this.shadowRoot.getElementById('template-listbox').selected = 0;
    }
  }

  _render({ _templateId, _size, _colors, _showAlphaLayer }) {
    const content = getRenderableTemplate(_templateId, _size, _colors);
    if (this._updateRouting && _templateId && this._validateSize(_size) && this._validateColors(_colors)) {
      this.shadowRoot.getElementById('router').setQueryParams(_templateId, this._size, this._colors);
    }
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
        paper-button {
          background-color: #fff;
          margin-top: 1em;
          text-transform: none;
          width: 8em;
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
      
      <nlg-router id="router"></nlg-router>
      
      <nlg-randomizer 
        on-random-sequence-start="${this._onRandomSequenceStart.bind(this)}"
        on-random-sequence-step="${this._onRandomSequenceStep.bind(this)}"
        on-random-sequence-end="${this._onRandomSequenceEnd.bind(this)}">
      </nlg-randomizer>
  
      <paper-dropdown-menu class="template-picker" label="Logo Template"
        on-iron-select="${this._onTemplateSelected.bind(this)}">
        <paper-listbox id="template-listbox" slot="dropdown-content">
          ${this._drawTemplateOptions()}
        </paper-listbox>
      </paper-dropdown-menu>
  
      <nlg-size-picker size="${_size}" on-size-changed="${e => this._onSizeChanged(e)}"></nlg-size-picker>
  
      ${this._drawColorPickers(_colors)}  
  
      <paper-checkbox class="show-alpha" checked="${_showAlphaLayer}"
        on-change="${this._onShowLayerChanged.bind(this)}">
        Show opacity (alpha layer) in the preview
      </paper-checkbox>
  
      ${this._drawPreview(_size, _colors, _showAlphaLayer, content)}
      
      <paper-toast id="toastShare">Link copied to clipboard.</paper-toast>
    `;
  }

  _drawColorPickers(colors) {
    return colors.map(color => html`
      <nlg-color-picker color="${color}" on-color-changed="${this._onColorChanged.bind(this)}"></nlg-color-picker>
    `);
  }

  _drawTemplateOptions() {
    return TEMPLATES.map(template => html`
      <paper-item id="${template.id}">${template.id}</paper-item>
    `);
  }

  _drawPreview(size, colors, showAlphaLayer, content) {
    if (!this._validateSize(size) || !this._validateColors(colors)) {
      return;
    }
    return html`
      <div>
        <paper-button raised on-click="${() => this._onDownloadClick(content)}">
          <iron-icon icon="file-download"></iron-icon>
          Download
        </paper-button>
        <paper-button raised on-click="${() => this._onShareClick()}">
          <iron-icon icon="social:share"></iron-icon>
          Share
        </paper-button>
      </div>
      <div class="svg-wrapper-container">
        <div class$="svg-wrapper ${showAlphaLayer ? 'show-alpha' : ''}">${unsafeHTML(content)}</div>
      </div>
    `;
  }

  _validateSize(size) {
    return size && size.width && size.width > 0 && size.height && size.height > 0;
  }

  _validateColor(color) {
    return color.fill && !isNaN(parseFloat(color.opacity));
  }

  _validateColors(colors) {
    const hasInvalidColor = colors.find(color => !this._validateColor(color));
    return !hasInvalidColor;
  }

  _onTemplateSelected(e) {
    if (this._templateId === e.detail.item.id) {
      return;
    }
    this._templateId = e.detail.item.id;
    const template = TEMPLATES.find(template => template.id === this._templateId);
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

  _onRandomSequenceStart() {
    this._updateRouting = false;
  }

  _onRandomSequenceStep() {
    this._setRandomColors();
  }

  _onRandomSequenceEnd() {
    this._setRandomColors();
    this._updateRouting = true;
  }

  _onShowLayerChanged(e) {
    this._showAlphaLayer = e.target.checked;
  }

  _onDownloadClick(svg) {
    renderSVG(svg).then(url => {
      const link = document.createElement('a');
      link.setAttribute('hidden', true);
      link.download = `${this._templateId}-${this._size.height}x${this._size.width}`;
      link.href = url;
      sendEvent('download', {
        'templateId': this._templateId,
        'height': this._size.height,
        'width': this._size.width,
      });
      link.click();
    });
  }

  _onShareClick() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.value = window.location.href;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    this.shadowRoot.getElementById('toastShare').open();
  }

  _setRandomColors() {
    const defaultColors = COLORS.slice();
    this._colors = this._colors.map(_color => {
      const color = Object.assign({}, _color);
      const defaultColor = defaultColors.splice(Math.floor(Math.random() * defaultColors.length), 1)[0];
      color.opacity = 1;
      color.fill = defaultColor.value;
      return color;
    });
  }
}
window.customElements.define('nlg-app', NLGApp);
