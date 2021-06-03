'use strict';
const Generator = require('yeoman-generator');
const helpers = require('../../helpers');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("output", {type: String});
    this.option("site", {type: String});
  }

  initializing() {
    this.site = JSON.parse(this.options.site);
  }

  writing() {
    this.spawnCommand('git', ['init']);
    ['public', 'src', '.gitignore', 'package.json', 'README.md', 'tsconfig.json'].forEach(
      name => this.fs.copyTpl(
        this.templatePath(name), 
        this.destinationPath(this.options.output, name), 
        { helpers, site: this.site, pathToComponents: "./", pathToHooks: "./" }
      )
    );

    this.site.components.forEach((component) => {
      this.composeWith(require.resolve('../component'), {
        site: this.options.site,
        component: JSON.stringify(component),
        output: this.options.output + '/src/components',
        pathToComponents: "../",
      })
    })

    this.site.variables.forEach((variable) => {
      this.composeWith(require.resolve('../hook'), {
          site: this.options.site,
          variable: JSON.stringify(variable),
          output: this.options.output + '/src/hooks',
          pathToComponents: "../", 
          pathToHooks: "./"
      })
    })
  }

  install() {
    // this.destinationRoot(this.options.output);
    // this.npmInstall();
  }
};
