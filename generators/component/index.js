'use strict';
const Generator = require('yeoman-generator');
const helpers = require('../../helpers');
const components =  require("components").components;
const ejs = require('ejs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("output", {type: String});
    this.option("component", {type: String});
    this.option("site", {type: String});
  }

  initializing() {
    this.site = JSON.parse(this.options.site);
    this.component = JSON.parse(this.options.component);
  }

  writing() {
    const component = components.find(component => component.id === this.component.templateId);
    this.fs.write(
      this.destinationPath(this.options.output, helpers.getComponentName(this.component), 'index.tsx'),
      ejs.render(component.getTemplate(), { helpers, site: this.site, component: this.component })
    );

    this.component.variables.forEach((variable) => {
      this.composeWith(require.resolve('../hook'), {
          site: this.options.site,
          variable: JSON.stringify(variable),
          output: this.options.output + '/' + helpers.getComponentName(this.component) + '/' + 'hooks'
      })
    })
  }
};
