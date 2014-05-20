// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  //appDir: "scripts",
  baseUrl: "/static/src/scripts/",
  paths: {
    // Opt for Lo-Dash Underscore compatibility build over Underscore.
    "underscore": "libs/vendor/underscore/underscore-min",

    // Map remaining vendor dependencies.
    "jquery": "libs/vendor/jquery/jquery-min",
    "backbone": "libs/vendor/backbone/backbone-min",
    "hbs": "libs/vendor/require-handlebars-plugin/hbs",
    "reveal": "libs/vendor/reveal/reveal-min",
    "socket.io": "libs/vendor/socket/socket.io-min"
  },

  hbs: {
      disableI18n: true,              
      templateExtension: 'html',
      helperPathCallback: function (name) {
        return 'templates/helpers/' + name;
      }
  },

  shim: {
    // This is required to ensure Backbone works as expected within the AMD
    // environment.
    "backbone": {
      // These are the two hard dependencies that will be loaded first.
      deps: ["jquery", "underscore"],

      // This maps the global `Backbone` object to `require("backbone")`.
      exports: "Backbone"
    },
    "underscore": {
      exports: "_"
    },
    "reveal": {
      exports: "Reveal"
    }
  }
});
