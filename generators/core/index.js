var generators = require('yeoman-generator');
var rename = require("gulp-rename");

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.option('name');
  },
  'prompting' : function () {
    //console.log('prompting - turbo ' + this.options.wpname);
  },

  writing : function () {
    console.log('Creating webpart templates');

    var THAT = this;

    // this.registerTransformStream(rename(function(path) {
    //     path.basename = path.basename.replace(/(-name-)/g, THAT.options.wpname);
    //     path.dirname = path.dirname.replace(/(-name-)/g, THAT.options.wpname);
    // }));
    
  }
});