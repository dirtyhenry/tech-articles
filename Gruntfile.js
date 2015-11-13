module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      production: {
        options: {
          yuicompress: true
        },
        files: {
          "assets/css/bootstragram-blog.min.css": "_less/bootstragram-blog.less",
          "assets/css/bootstragram-print.min.css": "_less/bootstragram-print.less"
        }
      }
    },
    copy: {
      fontawesome: {
        files: 
        [
          {expand: true, cwd: 'bower_components/components-font-awesome/css/', src: ['font-awesome.css'], dest: 'vendor/assets/css/'},
          {expand: true, cwd: 'bower_components/components-font-awesome/css/', src: ['font-awesome.min.css'], dest: 'vendor/assets/css/'},
          {expand: true, cwd: 'bower_components/components-font-awesome/fonts/', src: ['*'], dest: 'vendor/assets/fonts/'}
        ]
      },
      jQuery: {
        files: 
        [
          {expand: true, cwd: 'bower_components/jQuery/', src: ['*.js'], dest: 'vendor/assets/js/'}
        ]
      },
      bootstragram: {
        files: 
        [
          {expand: true, cwd: 'bower_components/bootstragram-web-commons/css/', src: ['*.css'], dest: 'vendor/assets/css/'},
          {expand: true, cwd: 'bower_components/bootstragram-web-commons/assets/', src: ['logo*.png'], dest: 'vendor/assets/images/'},
          {expand: true, cwd: 'bower_components/bootstragram-web-commons/js/', src: ['boot*.js'], dest: 'vendor/assets/js/'}
        ]
      },
      bigfoot: {
        files: 
        [
          {expand: true, cwd: 'bower_components/bigfoot/dist/', src: ['bigfoot.min.js'], dest: 'vendor/assets/js/'},
          {expand: true, cwd: 'bower_components/bigfoot/dist/', src: ['bigfoot-default.css'], dest: 'vendor/assets/css/'}
        ]
      }, 
      d3: {
        files: 
        [
          {expand: true, cwd: 'bower_components/d3/', src: ['d3*.js'], dest: 'vendor/assets/js/'}
        ]
      }
    },
    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve --watch'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', [ 'copy', 'less' ]);
};
