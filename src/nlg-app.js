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
import { TEMPLATES, getSkeleton } from './templates.js';
import { renderSVG } from './svg-renderer.js';

window.devicePixelRatio = 1;

class NLGApp extends LitElement {
  _render({
    template, width, height, primaryFill, primaryOpacity, secondaryFill, secondaryOpacity,
    backgroundFill, backgroundOpacity, _showAlphaLayer,
  }) {
    const content = getSkeleton(template, {
      width,
      height,
      primaryFill,
      primaryOpacity,
      secondaryFill,
      secondaryOpacity,
      backgroundFill,
      backgroundOpacity,
    });

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

    <paper-dropdown-menu class="template-picker" label="Logo Template" on-iron-select="${e => this._onTemplateSelected(e)}">
      <paper-listbox slot="dropdown-content" selected="0">
        ${this._drawTemplateOptions()}
      </paper-listbox>
    </paper-dropdown-menu>

    <nlg-size-picker height="${height}" width="${width}" on-size-changed="${e => this._onSizeChanged(e)}"></nlg-size-picker>

    ${this._drawColorPicker('Primary', primaryFill, primaryOpacity, this._onPrimaryChanged.bind(this))}
    ${this._drawColorPicker('Secondary', secondaryFill, secondaryOpacity, this._onSecondaryChanged.bind(this))}
    ${this._drawColorPicker('Background', backgroundFill, backgroundOpacity, this._onBackgroundChanged.bind(this))}  

    <paper-checkbox class="show-alpha" checked="${_showAlphaLayer}" on-change="${e => this._onShowLayerChanged(e)}">Show opacity (alpha layer) in the preview</paper-checkbox>

    <paper-button class="download" raised on-click="${() => this._download(content)}">Download</paper-button>
    <div class="svg-wrapper-container">
      <div class$="svg-wrapper ${this._showAlphaLayer ? 'show-alpha' : ''}">${unsafeHTML(content)}</div>
    </div>
`;
  }

  static get properties() {
    return {
      width: Number,
      height: Number,
      primaryFill: String,
      primaryOpacity: Number,
      secondaryFill: String,
      secondaryOpacity: Number,
      backgroundFill: String,
      backgroundOpacity: Number,
      template: String,
      _showAlphaLayer: Boolean,
    };
  }

  _drawTemplateOptions() {
    return Object.keys(TEMPLATES).map(id => html`
      <paper-item id="${id}">${id}</paper-item>
    `);
  }

  _drawColorPicker(label, fill, opacity, onChanged) {
    return !fill ? null : html`
      <nlg-color-picker label="${label}" fill="${fill}" opacity="${opacity}" on-color-changed="${e => onChanged(e)}"></nlg-color-picker>
    `;
  }

  _onTemplateSelected(e) {
    this.template = e.detail.item.id;
    const template = TEMPLATES[this.template];
    this.width = template.width;
    this.height = template.height;
    this.primaryFill = template.primaryFill;
    this.primaryOpacity = template.primaryOpacity;
    this.secondaryFill = template.secondaryFill;
    this.secondaryOpacity = template.secondaryOpacity;
    this.backgroundFill = template.backgroundFill;
    this.backgroundOpacity = template.backgroundOpacity;
  }

  _set(propertyName, value) {
    if (value) {
      this[propertyName] = value;
    }
    return this[propertyName];
  }

  _onSizeChanged(e) {
    this._set('width', e.detail.width);
    this._set('height', e.detail.height);
  }

  _onPrimaryChanged(e) {
    this._set('primaryFill', e.detail.fill);
    this._set('primaryOpacity', e.detail.opacity);
  }

  _onSecondaryChanged(e) {
    this._set('secondaryFill', e.detail.fill);
    this._set('secondaryOpacity', e.detail.opacity);
  }

  _onBackgroundChanged(e) {
    this._set('backgroundFill', e.detail.fill);
    this._set('backgroundOpacity', e.detail.opacity);
  }

  _onShowLayerChanged(e) {
    this._showAlphaLayer = e.target.checked;
  }

  _download(svg) {
    renderSVG(svg).then(url => {
      const link = document.createElement('a');
      link.setAttribute('hidden', true);
      link.download = `${this.template}-${this.height}x${this.width}`;
      link.href = url;
      link.click();
    });
  }
}
window.customElements.define('nlg-app', NLGApp);
