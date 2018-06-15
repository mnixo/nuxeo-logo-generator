import { LitElement } from '@polymer/lit-element';

const up = 'ArrowUp';
const right = 'ArrowRight';
const down = 'ArrowDown';
const left = 'ArrowLeft';
const a = 'KeyA';
const b = 'KeyB';

class NLGRandomizer extends LitElement {
  static get properties() {
    return {
      konamiCode: Array,
      currentCode: Array,
    };
  }

  constructor() {
    super();
    this.konamiCode = [ up, up, down, down, left, right, left, right, b, a ];
    this.currentCode = [];
    document.addEventListener('keydown', this._onKeys.bind(this));
  }

  _render({ konamiCode }) {

  }

  _onKeys(e) {
    this.currentCode.push(e.code);
    // check if the whole code is correct
    if (this.konamiCode.toString() === this.currentCode.toString()) {
      this.currentCode = [];
      this._triggerRandomSequence(1);
      return;
    }
    // check if the last inserted key is correct
    const idx = this.currentCode.length - 1;
    if (this.currentCode[idx] !== this.konamiCode[idx]) {
      this.currentCode = [];
    }
  }

  _triggerRandomSequence(interval) {
    this.dispatchEvent(new CustomEvent('random-code'));
    if (interval < 400) {
      setTimeout(() => this._triggerRandomSequence(interval * 1.2), interval);
    }
  }
}
window.customElements.define('nlg-randomizer', NLGRandomizer);