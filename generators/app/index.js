'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var rename = require("gulp-rename");

module.exports = generators.Base.extend({

  initializing : function () {
    
  },
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.green('SharePoint 2013 Client Web Part') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'wpname',
      message: 'What is the name of this webpart (nospaces)?',
      default: this.appname
    },
    {
      type: 'input',
      name: 'title',
      message: 'Web part title?',
      default: this.appname + ' Web Part'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Web part description?',
      default: this.appname + ' description'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },
  copyCore: function () {
    console.log('Creating webpart');
    this.fs.copyTpl(
      this.templatePath('core/WebPartController.ts'),
      this.destinationPath('src/' + this.props.wpname + 'Controller.ts'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('core/IEventWebPartProps.ts'),
      this.destinationPath('src/I' + this.props.wpname + 'Props.ts'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('core/index.d.ts'),
      this.destinationPath('src/index.d.ts'),
      this.props
    );
  },
  copyLibraries: function () {
    console.log('Copying library files..');
    this.fs.copyTpl(
      this.templatePath('libraries/*.*'),
      this.destinationPath('src/libraries'),
      this.props
    );
  },
  copyLibraryTemplates: function () {
    this.fs.copyTpl(
      this.templatePath('librarytemplates/*.*'),
      this.destinationPath('src/libraries/templates'),
      this.props
    );
  },
  copyCoreTemplates: function () {
    var _this = this;

    this.registerTransformStream(rename(function (path) {
        path.dirname = path.dirname.replace('-name-', _this.props.wpname);
        path.basename = path.basename.replace('-name-', _this.props.wpname);
        return path;
    }));
    this.fs.copyTpl(
      this.templatePath('coretemplates/*.*'),
      this.destinationPath('src/templates'),
      this.props
    );
  },
  copySrc: function () {
    var _this = this;
    this.registerTransformStream(rename(function (path) {
        //path.dirname = path.dirname.replace('_', '');
        path.basename = path.basename.replace('_', '');
        return path;
    }));
    this.fs.copyTpl(
      this.templatePath('src/**/*.*'),
      this.destinationPath(''),
      _this.props
    );
  },
  copyApp: function () {
    var _this = this;
    this.registerTransformStream(rename(function (path) {
        path.dirname = path.dirname.replace('-name-', '');
        path.basename = path.basename.replace('-name-', '');
        return path;
    }));
    this.fs.copyTpl(
      this.templatePath('App/**/*.*'),
      this.destinationPath('App'),
      _this.props
    );
  },
  install: function () {
    this.installDependencies();
  }
});