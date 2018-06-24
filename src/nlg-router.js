import { LitElement, html } from '@polymer/lit-element';
import '@polymer/app-route/app-location';

class NLGRouter extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  getQueryParams() {
    const params = this.shadowRoot.getElementById('app-location').queryParams;
    return !params.template ? {} : {
      template: params.template,
      size: JSON.parse(params.size),
      colors: JSON.parse(params.colors),
    };
  }

  setQueryParams(template, size, colors) {
    this.shadowRoot.getElementById('app-location').queryParams = {
      template,
      size: JSON.stringify(size),
      colors: JSON.stringify(colors),
    };
  }

  _render(props) {
    return html`
      <app-location id="app-location"></app-location>
    `;
  }
}
window.customElements.define('nlg-router', NLGRouter);
