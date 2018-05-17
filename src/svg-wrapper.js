/**
@license
Copyright 2017 Ali Naci Erdem

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class SvgWrapper extends PolymerElement {
  static get is() { return 'svg-wrapper'; }
  static get template() {
    return html`<canvas id="canvas" style="display:none;"></canvas>`;
  }

  static get properties() {
    return {
      svgData: {
        type: String,
        value: "",
        observer: "_dataChanged"
      },
      svgElement: {
        type: HTMLElement
      },
      preRender: {
        type: Boolean
      },
      finalSvgData: {
        type: String
      },
      reference: {
        type: String
      }
    }
  }
  ready() {
    super.ready();
    // Read the SVG data if it is a child element
    // o/w the observer will get triggered when the data is updated
    if (this.firstElementChild) {
      this.svgData = this.firstElementChild.outerHTML;
    }
  }
  dispatchRenderStart() {
    this.shouldFireRenderStart = false;
    this.dispatchEvent(new CustomEvent('renderStart', {
      bubbles: true, composed: true
    }));
  }
  dispatchRenderCompleted() {
    this.shouldFireRenderComplete = false;
    this.dispatchEvent(new CustomEvent('renderComplete', {
      bubbles: true, composed: true
    }));
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.shouldFireRenderStart) {
      this.dispatchRenderStart();
      this.shouldFireRenderStart = false;
    }
    if (this.shouldFireRenderComplete) {
      this.dispatchRenderCompleted();
      this.shouldFireRenderComplete = false;
    }
  }
  drawOnCanvas() {
    // Put initial data for reference
    if (this.reference) {
      SvgWrapper.cachedData[this.reference] = SvgWrapper.cachedData[this.reference] || {};
      SvgWrapper.cachedDataObservers[this.reference] = SvgWrapper.cachedDataObservers[this.reference] || [];
    }
    // Get the size. This requires that the element is
    // visible, so try until successful
    // TODO: get an optional event from the user to notify, it is visible
    var w = this.svgElement.clientWidth;
    var h = this.svgElement.clientHeight;
    this.$.canvas.width = w * window.devicePixelRatio;
    this.$.canvas.height = h * window.devicePixelRatio;
    if (this.$.canvas.width == 0 || this.$.canvas.height == 0) {
      Polymer.RenderStatus.afterNextRender(this, this.drawOnCanvas);
      return;
    }
    this.$.canvas.style.width = w + 'px';
    this.$.canvas.style.height = h + 'px';
    var DOMURL = window.URL || window.webkitURL || window;
    var ctx = this.$.canvas.getContext('2d');
    var draw = function() {
      ctx.drawImage(this.img, 0, 0, this.$.canvas.width, this.$.canvas.height);
      DOMURL.revokeObjectURL(this.url);
      // Keep canvas data for later access
      if (this.reference) {
        SvgWrapper.cachedData[this.reference] = {
          width: this.$.canvas.width,
          height: this.$.canvas.height,
          styleWidth: this.$.canvas.style.width,
          styleHeight: this.$.canvas.style.height,
          data: ctx.getImageData(0, 0, this.$.canvas.width, this.$.canvas.height)
        };
        var callbacks = SvgWrapper.cachedDataObservers[this.reference];
        // Inform listeners
        for (var i = callbacks.length-1; i >= 0; i--) {
          var callback = callbacks[i];
          if (typeof callback === 'function') {
            callback();
          }
          callbacks.splice(i, 1);
        }
      }
      // Hide SVG
      this.svgElement.style.display = 'none';
      if (this.isConnected) {
        this.dispatchRenderCompleted();
      } else {
        this.shouldFireRenderComplete = true;
      }
    }.bind(this);
    // Draw if already loaded
    if (this.imageLoaded) {
      draw();
    } else {
      // Update the load handler
      this.img.onload = function() {
        draw();
      }.bind(this);
    }
  }
  drawFromCache() {
    if (this.reference) {
      // Will load or have data - wait or copy
      if (SvgWrapper.cachedData.hasOwnProperty(this.reference)) {
        // Already have a listener, just wait
        if (this.waitingCache) {
          return true;
        }
        var copyData = function() {
          // Render asynchronously to make it possible to accumulate
          // all synchronous renderStart listeners
          Polymer.RenderStatus.afterNextRender(this, function() {
            var data = SvgWrapper.cachedData[this.reference];
            this.$.canvas.style.display = '';
            this.$.canvas.width = data.width ;
            this.$.canvas.height = data.height;
            this.$.canvas.style.width = data.styleWidth;
            this.$.canvas.style.height = data.styleHeight;
            var ctx = this.$.canvas.getContext('2d');
            ctx.putImageData(data.data, 0, 0);
            this.waitingCache = false;
            if (this.isConnected) {
              this.dispatchRenderCompleted();
            } else {
              this.shouldFireRenderComplete = true;
            }
          });
        }.bind(this);
        this.waitingCache = true;
        // Already have data - copy
        if (SvgWrapper.cachedData[this.reference].hasOwnProperty('data')) {
          copyData();
        } else { // wait for data
          SvgWrapper.cachedDataObservers[this.reference].push(copyData)
        }
        return true;
      }
    }
    return false;
  }
  _dataChanged(newData) {
    var haveData = !!newData.trim();
    var fromCache = this.drawFromCache();
    if(haveData || fromCache) {
      if (this.isConnected) {
        this.dispatchRenderStart();
      } else {
        this.shouldFireRenderStart = true;
      }
    }
    if (fromCache) {
      return;
    }
    if (haveData) {
      if (this.svgElement)
        this.shadowRoot.removeChild(this.svgElement);
      // Replace style tag
      var finalSvgData = newData.replace(/svg-style>/gmi, 'style>')
      // Parse the SVG
      var holder = document.createElement('div');
      holder.innerHTML = finalSvgData;
      this.svgElement = holder.firstElementChild;
      if (this.svgElement && this.svgElement.nodeName.toLowerCase() != 'svg') {
        console.error('Is not an SVG');
        return;
      }
      // Move the SVG to shadow DOM to get its size or use as is
      this.shadowRoot.appendChild(this.svgElement);
      this.svgElement.style.display = '';
      if (this.preRender) {
        this.svgElement.style.opacity = '1';
        this.imageLoaded = false;
        this.$.canvas.style.display = '';
        // Convert into an image element through createObjectURL
        var DOMURL = window.URL || window.webkitURL || window;
        var blob = new Blob([finalSvgData], {type: 'image/svg+xml'});
        this.url = DOMURL.createObjectURL(blob);
        this.img = new Image();
        this.img.onload = () => {
          this.imageLoaded = true;
        };
        this.img.onerror = () => {
          console.error('Cannot render SVG');
        };
        this.img.src = this.url;
        // Try to draw
        this.drawOnCanvas();
      }
    } else {
      // No data, hide both
      this.$.canvas.style.display = 'none';
      if (this.svgElement) {
        this.svgElement.style.display = 'none';
      }
      this.waitingCache = false;
    }
  }
};
SvgWrapper.cachedData = {};
SvgWrapper.cachedDataObservers = {};
customElements.define(SvgWrapper.is, SvgWrapper);