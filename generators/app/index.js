'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("output", {type: String});
    this.option("pages", {type: String});
    this.destinationRoot(this.options.output);
  }

  initializing() {
    this.pages = JSON.parse(this.options.pages);
    if (Array.isArray(this.pages) === false) {
      throw new Error('Invalid pages config');
    }
  }

  writing() {
    this.pages.forEach((page) => {
      this.composeWith(require.resolve('../page'), {
        page: JSON.stringify(page),
        output: ""
      })
    })
  }
};
