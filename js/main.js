var requirejs = require('requirejs');

requirejs.config({
  baseUrl: "js",
  nodeRequire: require,
  paths: {
    'jquery': 'vendor/jquery/dist/jquery.min',
    'underscore': 'vendor/underscore/underscore.min',
    'backbone': 'vendor/backbone/backbone.min',
    'marionette' : 'vendor/backbone.marionette/lib/backbone.marionette.min'
  },
  shim: {
      underscore: {
          exports: '_'
      },
      backbone: {
          exports: 'Backbone',
          deps: ['jquery', 'underscore']
      },
      marionette: {
        exports: 'Backbone.Marionette',
        deps: ['backbone']
      }
  },
  deps: ['jquery', 'underscore']
});

var App = require('./app');
car myapp = new App();
myapp.start();
