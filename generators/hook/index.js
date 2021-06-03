'use strict';
const Generator = require('yeoman-generator');
const helpers = require('../../helpers');
const hooks =  require("components").hooks;
const ejs = require('ejs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("output", {type: String});
    this.option("variable", {type: String});
    this.option("site", {type: String});
    this.option("pathToComponents", {type: String});
    this.option("pathToHooks", {type: String});
  }

  initializing() {
    this.site = JSON.parse(this.options.site);
    this.variable = JSON.parse(this.options.variable);
    this.pathToComponents = this.options.pathToComponents;
    this.pathToHooks = this.options.pathToHooks;
  }

  writing() {
    console.log(this.variable.templateId)
    const hook = hooks.find(h => h.id === this.variable.templateId);
    console.log(hook.getTemplate())
    console.log(this.variable)
    this.fs.write(
      this.destinationPath(this.options.output, helpers.getHookName(this.variable), 'index.tsx'),
      ejs.render(hook.getTemplate(), { 
        helpers, 
        site: this.site, 
        hook: this.variable,
        pathToComponents: this.pathToComponents + "../",
        pathToHooks: this.pathToHooks + "../"
      })
    );
  }
};
