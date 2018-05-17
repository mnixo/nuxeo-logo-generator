import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class NLGColors extends PolymerElement {
  static get template() {
    return html`

`;
  }

  static get is() {
    return 'nlg-colors';
  }

  static get properties() {
    return {
      _colors: {
        type: Array,
        value: [
          {
            'id': 'Dark blue',
            'value': '#1F28BF',
          },
          {
            'id': 'Nuxeo blue',
            'value': '#0066FF',
          },
          {
            'id': 'Light blue',
            'value': '#00ADED',
          },
          {
            'id': 'Teal',
            'value': '#73D2CF',
          },
          {
            'id': 'Purple',
            'value': '#8400FF',
          },
          {
            'id': 'Red',
            'value': '#FF0044',
          },
          {
            'id': 'Orange',
            'value': '#FF9E00',
          },
          {
            'id': 'Black',
            'value': '#000000',
          },
          {
            'id': 'Medium gray',
            'value': '#7F8284',
          },
          {
            'id': 'Light gray',
            'value': '#BCBFBF',
          },
          {
            'id': 'White',
            'value': '#FFFFFF',
          },
        ],
      },
    };
  }

  get(id) {
    return this._colors.find(color => color.id === id);
  }

  getAll() {
    return this._colors;
  }
}
window.customElements.define(NLGColors.is, NLGColors);
