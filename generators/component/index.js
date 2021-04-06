'use strict';
const Generator = require('yeoman-generator');
const components =  require("components").default;
const ejs = require('ejs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("output", {type: String});
    this.option("component", {type: String});
  }

  initializing() {
    this.component = JSON.parse(this.options.component);
  }

  writing() {
    const component = components.find(component => component.id === this.component.componentId);
    this.fs.write(
      this.destinationPath(this.options.output, component.id + '.tsx'),
      ejs.render(component.template)
    );
  }
};
