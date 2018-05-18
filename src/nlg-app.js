import { LitElement, html } from '@polymer/lit-element';
import {unsafeHTML} from 'lit-html/lib/unsafe-html.js';
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
import { COLORS } from './colors.js';
import { TEMPLATES, getSkeleton } from './templates.js';
import {renderSVG} from './svg-renderer.js';

window.devicePixelRatio = 1;

class NLGApp extends LitElement {
  _render({template, width, height, primaryFill, primaryOpacity, secondaryFill, secondaryOpacity, backgroundFill, backgroundOpacity, _showAlphaLayer}) {

    const content = getSkeleton(template, {width, height, primaryFill, primaryOpacity, secondaryFill, secondaryOpacity, backgroundFill, backgroundOpacity});

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
      
      .show-alpha {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gUQFToDqewmngAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAGUlEQVQIHQEOAPH/Aebm5tzc3ALc3NwkJCRFcghK/x9NRAAAAABJRU5ErkJggg==');
        background-size: 20px 20px;
        image-rendering: pixelated;
      }
      div.svg-wrapper-container {
        border: dashed rgba(0, 0, 0, 0.5) 1px;
        margin: 1em 0;
      }
    </style>

    <paper-dropdown-menu class="template-picker" label="Logo Template" on-iron-select="${(e) => this._itemSelected(e.detail.item.id)}">
      <paper-listbox slot="dropdown-content" selected="0">
        ${Object.keys(TEMPLATES).map((id) => html` <paper-item id="${id}">${id}</paper-item>`)}
      </paper-listbox>
    </paper-dropdown-menu>

    <nlg-size-picker height="${height}" width="${width}" on-size-changed="${(e) => this._setSize(e.detail) }}"></nlg-size-picker>

    ${primaryFill ? html`<nlg-color-picker label="Primary" fill="${primaryFill}" opacity="${primaryOpacity}" on-color-changed="${e => this._setPrimaryColor(e.detail)}"></nlg-color-picker>` : null}
    ${secondaryFill ? html`<nlg-color-picker label="Secondary" fill="${secondaryFill}" opacity="${secondaryOpacity}" on-color-changed="${e => this._setSecondaryColor(e.detail)}"></nlg-color-picker>` : null}
    ${backgroundFill ? html`<nlg-color-picker label="Background" fill="${backgroundFill}" opacity="${backgroundOpacity}" on-color-changed="${e => this._setBackgroundColor(e.detail)}"></nlg-color-picker>` : null}  

    <paper-checkbox checked="${_showAlphaLayer}" on-change="${e => this._showAlphaLayer = e.target.checked}">Show alpha layer in the preview</paper-checkbox>

    <paper-button class="download" raised on-click="${() => this._download(content)}">Download</paper-button>
    <div class="svg-wrapper-container">
      <div class$="${`svg-wrapper ${this._showAlphaLayer ? 'show-alpha' : ''}`}">${unsafeHTML(content)}</div>
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

  _itemSelected(id) {
    this.template = id;
    const template = TEMPLATES[id];
    this.width = template.width;
    this.height = template.height;
    this.primaryFill = template.primaryFill;
    this.primaryOpacity = template.primaryOpacity;
    this.secondaryFill = template.secondaryFill;
    this.secondaryOpacity = template.secondaryOpacity;
    this.backgroundFill = template.backgroundFill;
    this.backgroundOpacity = template.backgroundOpacity;
  }

  _setSize({width, height}) {
    if (width) this.width = width;
    if (height) this.height = height;
  }

  _setPrimaryColor({fill, opacity}) {
    if (fill) this.primaryFill = fill;
    if (opacity) this.primaryOpacity = opacity;
  }

  _setSecondaryColor({fill, opacity}) {
    if (fill) this.secondaryFill = fill;
    if (opacity) this.secondaryOpacity = opacity;
  }

  _setBackgroundColor({fill, opacity}) {
    if (fill) this.backgroundFill = fill;
    if (opacity) this.backgroundOpacity = opacity;
  }

  _download(svg) {
    renderSVG(svg).then((url) => {
      const link = document.createElement("a");
      link.setAttribute('hidden', true);
      link.download = `${this.template}-${this.height}x${this.width}`;
      link.href = url;
      link.click();
    });
  }
}
window.customElements.define('nlg-app', NLGApp);
