module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    react: {
      single_file_output: {
        files: {
          'js/application.js': 'js/application.jsx'
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['bower_components/react/react.min.js', 'js/application.js'],
        dest: 'dist/js/build.js',
      },
    },

    uglify: {
      build: {
        src: 'dist/js/build.js',
        dest: 'dist/js/build.min.js'
      }
    },

    less: {
      compile: {
        files: {
          'dist/css/main.css': 'css/main.less'
        }
      }
    },

    eslint: {
      target: ['js/application.js']
    },

    watch: {
      files: ['js/application.js'],
      tasks: ['eslint']
    },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('lint', ['eslint:target']);
  grunt.registerTask('dist', ['concat', 'eslint', 'uglify', 'less']);

};