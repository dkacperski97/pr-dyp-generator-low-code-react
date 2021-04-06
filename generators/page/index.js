'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("output", {type: String});
    this.option("page", {type: String});
  }

  initializing() {
    this.page = JSON.parse(this.options.page);
  }

  writing() {
    this.page.layout.forEach((component) => {
      this.composeWith(require.resolve('../component'), {
          component: JSON.stringify(component),
          output: this.options.output
      })
    })
  }
};
