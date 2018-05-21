# Nuxeo Logo Generator

[![Build Status](https://travis-ci.org/mnixo/nuxeo-logo-generator.svg?branch=master)](https://travis-ci.org/mnixo/nuxeo-logo-generator)

Nuxeo Logo Generator is a small web application that simplifies the process of creating Nuxeo logos.

### How do I create some logos?

[Try it here!](https://mnixo.github.io/nuxeo-logo-generator/) 

### Parameters

- Logo template: base template of the logo.
- Height and Width: dimensions of the logo, in pixels.
- Colors: from the default color palette or custom.
  - Value: color code (CSS valid).
  - Opacity: alpha value of the color (0 to 1).

All the SVG logo templates and default colors are compliant with the Nuxeo branding guidelines.

The resulting file format for the logo is PNG.

### Under the (small) hood

Nuxeo Logo Generator started as a simple [Polymer 2](https://www.polymer-project.org/2.0/start/) application.
As a candidate for exploratory research, it evolved into a [Polymer 3](https://www.polymer-project.org/3.0/start/) app, using the very new and unreleased [LitElement](https://github.com/Polymer/lit-element) base class.
