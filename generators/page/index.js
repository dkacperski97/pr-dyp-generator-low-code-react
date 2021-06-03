'use strict';
const Generator = require('yeoman-generator');
const helpers = require('../../helpers');
const ejs = require('ejs');

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
    this.fs.copyTpl(
      this.templatePath('page.tsx'),
      this.destinationPath(this.options.output, 'src', 'pages', this.page.uniqueName.replace(/\s/g, "") + '.tsx'),
      { helpers, page: this.page }
    );

    this.page.layout.forEach((component) => {
      this.composeWith(require.resolve('../component'), {
          component: JSON.stringify(component),
          output: this.options.output
      })
    })
  }
};
