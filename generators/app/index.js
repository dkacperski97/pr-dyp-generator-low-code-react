'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("output", {type: String});
    this.option("pages", {type: String});
  }

  initializing() {
    this.pages = JSON.parse(this.options.pages);
    if (Array.isArray(this.pages) === false) {
      throw new Error('Invalid pages config');
    }
  }

  writing() {
    this.spawnCommand('git', ['init']);
    ['public', 'src', '.gitignore', 'package.json', 'README.md', 'tsconfig.json'].forEach(
      name => this.fs.copyTpl(this.templatePath(name), this.destinationPath(this.options.output, name), { pages: this.pages })
    );

    this.pages.forEach((page) => {
      this.composeWith(require.resolve('../page'), {
        page: JSON.stringify(page),
        output: this.options.output
      })
    })
  }

  install() {
    // this.destinationRoot(this.options.output);
    // this.npmInstall();
  }
};
