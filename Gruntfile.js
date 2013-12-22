module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['assets'],
    concat: {
      css: {
        src: [
          'assets.dev/css/bootstrap.css',
          'assets.dev/css/bootstrap-responsive.css',
          'assets.dev/css/style.css',
          'assets.dev/css/font-awesome.css'
        ],
        dest: 'assets/css/<%= pkg.name %>.css'
      },
      js: {
        src: [
          'assets.dev/js/jquery.js',
          'assets.dev/js/bootstrap-transition.js',
          'assets.dev/js/bootstrap-scrollspy.js',
          'assets.dev/js/jquery.prettyPhoto.js',
          'assets.dev/js/tweetable.jquery.js',
          'assets.dev/js/jquery.timeago.js',
          'assets.dev/js/jquery.localscroll-1.2.7.js',
          'assets.dev/js/jquery.inview.js',
          'assets.dev/js/jquery.scrollTo-1.4.2.js',
          'assets.dev/js/jquery.parallax-1.1.3.js',
          'assets.dev/js/custom.js'
        ],
        dest: 'assets/js/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        src: [
          'assets/css/*.css'
        ],
        ext: '.min.css'
      }
    },
    uglify: {
      minify: {
        files: {
          'assets/js/<%= pkg.name %>.min.js': ['assets/js/<%= pkg.name %>.js']
        }
      }
    },
    htmlmin: {
      minify: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true
        },
        files: {
          'index.html': 'index.dev.html'
        }
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,
          cwd: 'assets.dev/img',
          src: ['**/*.png'],
          dest: 'assets/img/',
          ext: '.png'
        }]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'assets.dev/img',
          src: ['**/*.jpg'],
          dest: 'assets/img/',
          ext: '.jpg'
        }]
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'assets.dev/img/',
            src: ['**/*.gif'],
            dest: 'assets/img/'
          },
          {
            expand: true,
            cwd: 'assets.dev/font/',
            src: ['**'],
            dest: 'assets/font/'
          },
          {
            expand: true,
            cwd: 'assets.dev/ico/',
            src: ['**'],
            dest: 'assets/ico/'
          }
        ]
      }
    },
    cacheBust: {
      assets: {
        files: [{
          src: ['index.html', 'assets/css/<%= pkg.name %>.css']
        }]
      }
    },
    watch: {
      js: {
        files: ['assets.dev/js/*.js'],
        tasks: ['concat', 'uglify', 'htmlmin', 'cacheBust'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['assets.dev/css/*.css'],
        tasks: ['concat', 'cssmin', 'htmlmin', 'cacheBust'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['index.dev.html'],
        tasks: ['htmlmin'],
        options: {
          spawn: false
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['clean', 'concat', 'cssmin', 'uglify', 'htmlmin', 'imagemin', 'copy', 'cacheBust']);
};