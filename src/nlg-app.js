import '../../@polymer/iron-icon/iron-icon.js';
import '../../@polymer/iron-icons/iron-icons.js';
import '../../@polymer/neon-animation/web-animations.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/paper-checkbox/paper-checkbox.js';
import '../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/paper-item/paper-item.js';
import '../../@polymer/paper-listbox/paper-listbox.js';
import '../../@polymer/paper-styles/paper-styles.js';
import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import '../../svg-wrapper/svg-wrapper.js';
import './nlg-color-picker.js';
import './nlg-colors.js';
import './nlg-size-picker.js';
import './nlg-templates.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
class NLGApp extends PolymerElement {
  static get template() {
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
      svg-wrapper.hidden {
        width: 0;
        height: 0;
        opacity: 0;
      }
      svg-wrapper.displayed {
        display: flex;
        width: fit-content;
      }
      svg-wrapper.show-alpha {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gUQFToDqewmngAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAGUlEQVQIHQEOAPH/Aebm5tzc3ALc3NwkJCRFcghK/x9NRAAAAABJRU5ErkJggg==');
        background-size: 20px 20px;
        image-rendering: pixelated;
      }
      div.svg-wrapper-container {
        border: dashed rgba(0, 0, 0, 0.5) 1px;
        margin: 1em 0;
      }
    </style>

    <paper-dropdown-menu class="template-picker" label="Logo Template" on-iron-select="_itemSelected">
      <paper-listbox slot="dropdown-content" selected="0">
        <template is="dom-repeat" items="[[_getTemplates()]]">
          <paper-item id="[[item.id]]">[[item.id]]</paper-item>
        </template>
      </paper-listbox>
    </paper-dropdown-menu>

    <nlg-size-picker height="{{height}}" width="{{width}}"></nlg-size-picker>

    <template is="dom-if" if="[[template.primaryFill]]">
      <nlg-color-picker label="Primary" fill="{{primaryFill}}" opacity="{{primaryOpacity}}"></nlg-color-picker>
    </template>

    <template is="dom-if" if="[[template.secondaryFill]]">
      <nlg-color-picker label="Secondary" fill="{{secondaryFill}}" opacity="{{secondaryOpacity}}"></nlg-color-picker>
    </template>

    <template is="dom-if" if="[[template.backgroundFill]]">
      <nlg-color-picker label="Background" fill="{{backgroundFill}}" opacity="{{backgroundOpacity}}"></nlg-color-picker>
    </template>

    <paper-checkbox class="show-alpha" checked="{{_showAlphaLayer}}">Show alpha layer in the preview</paper-checkbox>

    <paper-button class="download" raised="" on-click="_download">Download</paper-button>

    <div class="svg-wrapper-container">
      <svg-wrapper class\$="displayed [[_getAlphaClass(_showAlphaLayer)]]" svg-data="[[content]]"></svg-wrapper>
    </div>

    <svg-wrapper class="hidden" id="svgWrapper" svg-data="[[content]]" pre-render=""></svg-wrapper>
    <a id="downloadLink" hidden=""></a>

    <nlg-colors id="colors"></nlg-colors>
    <nlg-templates id="templates"></nlg-templates>
`;
  }

  static get is() {
    return 'nlg-app';
  }

  static get properties() {
    return {
      content: String,
      width: Number,
      height: Number,
      primaryFill: String,
      primaryOpacity: Number,
      secondaryFill: String,
      secondaryOpacity: Number,
      backgroundFill: String,
      backgroundOpacity: Number,
      template: Object,
      _showAlphaLayer: {
        type: Boolean,
        value: true,
      },
    };
  }

  static get observers() {
    return [
      '_computeContent(template, width, height, primaryFill, primaryOpacity, secondaryFill, secondaryOpacity,' +
      'backgroundFill, backgroundOpacity)',
    ]
  }

  ready() {
    window.devicePixelRatio = 1;
    super.ready();
  }

  _getColors() {
    return this.$.colors.getAll();
  }

  _getTemplates() {
    return this.$.templates.getAll();
  }

  _computeContent() {
    if (!this.template) {
      return this.content = '';
    }
    const width = this.width ? this.width : this.template.width;
    const height = this.height ? this.height : this.template.height;
    const primaryFill = this.primaryFill ? this.primaryFill : this.template.primaryFill;
    const primaryOpacity = this.primaryOpacity ? this.primaryOpacity : this.template.primaryOpacity;
    const secondaryFill = this.secondaryFill ? this.secondaryFill : this.template.secondaryFill;
    const secondaryOpacity = this.secondaryOpacity ? this.secondaryOpacity : this.template.secondaryOpacity;
    const backgroundFill = this.backgroundFill ? this.backgroundFill : this.template.backgroundFill;
    const backgroundOpacity = this.backgroundOpacity ? this.backgroundOpacity : this.template.backgroundOpacity;
    this.content = this.$.templates.getSkeleton(width, height, this.template.viewBox, primaryFill, primaryOpacity,
      secondaryFill, secondaryOpacity, backgroundFill, backgroundOpacity, this.template.geometry);
  }

  _itemSelected(e) {
    this.template = this.$.templates.get(e.detail.item.id);
    this.width = this.template.width;
    this.height = this.template.height;
    this.primaryFill = this.template.primaryFill;
    this.primaryOpacity = this.template.primaryOpacity;
    this.secondaryFill = this.template.secondaryFill;
    this.secondaryOpacity = this.template.secondaryOpacity;
    this.backgroundFill = this.template.backgroundFill;
    this.backgroundOpacity = this.template.backgroundOpacity;
  }

  _download() {
    const link = this.$.downloadLink;
    link.download = `${this.template.id}-${this.height}x${this.width}`;
    link.href = this.$.svgWrapper.shadowRoot.querySelector('canvas').toDataURL("image/png");
    link.click();
  }

  _getAlphaClass() {
    return this._showAlphaLayer ? 'show-alpha' : '';
  }
}
window.customElements.define(NLGApp.is, NLGApp);
