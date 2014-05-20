module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'static/src/scripts/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        laxcomma: true,
        laxbreak: true,
        smarttabs: true,
        asi: true,
        ignores: ['static/src/scripts/libs/vendor/**/*.js']
      }
    },
    compass: {                  
      dist: {                   
        options: {              
          sassDir: 'static/src/styles/scss',
          cssDir: 'static/src/styles/css',
          environment: 'production'
        }
      },
      dev: {                   
        options: {              
          sassDir: 'static/src/styles/scss',
          cssDir: 'static/src/styles/css'
        }
      }
    },
    requirejs: {
      concat: {
        options: {
          // scripts dir that needs to be optimized
          baseUrl: 'static/src/scripts',
          // location of scripts dir to be copied after optimization
          dir: "static/bin/scripts",
          //JS file configuration to be read for the build
          mainConfigFile: 'static/require_config.js',
          modules: [
              { 
                  name: 'main'
              }
          ],
          // remove files that have been combined during optimization
          removeCombined: true,
          optimizeCss: 'none',
          waitSeconds: 150,
          optimize: 'none'
        }
      }
    },
    watch: {
      'css': {
        files: 'static/src/styles/scss/**/*.scss',
        tasks: ['compass:dev']
      },
      scripts: {
        files: ['static/src/scripts/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('concat', ['requirejs:concat']);
  grunt.registerTask('css-prod', ['compass']);

  grunt.registerTask('default', ['watch']);
};