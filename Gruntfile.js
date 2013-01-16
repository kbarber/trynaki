module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    concat: {
      uijs: {
        src: ['ui/js/**.js'],
        dest: 'build/public/js/trynaki.js'
      },
      uicss: {
        src: ['ui/css/**.css'],
        dest: 'build/public/css/trynaki.css'
      },
      serverjs: {
        src: ['server/js/**.js'],
        dest: 'build/server.js'
      }
    },
    lint: {
      core: ['grunt.js'],
      ui: ['ui/js/**.js'],
      server: ['server/js/**.js']
    },
    jshint: {
      options: {
        browser: true,
        es5: true // Tolerate the scope when checking for reserved words
      }
    },
    htmllint: {
      all: ["ui/public/**.html"]
    },
    csslint: {
      ui: {
        src: "ui/css/**.css"
      }
    },
    copy: {
      build: {
        files: [
          {expand: true, src: ["**"], cwd: "ui/public", dest: "build/public"}
        ]
      }
    },
    clean: {
      build: ['build'],
      jsdoc: ['out']
    },
    qunit: {
      all: ['test/**/*.html']
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'build/public'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask("default", ["lint", "csslint", "htmllint"]);
  grunt.registerTask("lint", ["lint", "csslint", "htmllint"]);
  grunt.registerTask("build", ["default", "clean:build", "concat", "copy:build"]);
  grunt.registerTask("fastbuild", ["concat", "copy:build"]);
  grunt.registerTask("test", ['connect', 'qunit']);
};
