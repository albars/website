module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['assets/v<%= pkg.version %>'],
    concat: {
      css: {
        src: [
          'assets/css/bootstrap.css',
          'assets/css/bootstrap-responsive.css',
          'assets/css/style.css',
          'assets/css/font-awesome.css'
        ],
        dest: 'assets/v<%= pkg.version %>/css/<%= pkg.name %>.css'
      },
      js: {
        src: [
          'assets/js/jquery.js',
          'assets/js/bootstrap-transition.js',
          'assets/js/bootstrap-scrollspy.js',
          'assets/js/jquery.prettyPhoto.js',
          'assets/js/tweetable.jquery.js',
          'assets/js/jquery.timeago.js',
          'assets/js/jquery.localscroll-1.2.7.js',
          'assets/js/jquery.inview.js',
          'assets/js/jquery.scrollTo-1.4.2.js',
          'assets/js/jquery.parallax-1.1.3.js',
          'assets/js/custom.js'
        ],
        dest: 'assets/v<%= pkg.version %>/js/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        src: [
          'assets/v<%= pkg.version %>/css/*.css'
        ],
        ext: '.min.css'
      }
    },
    uglify: {
      minify: {
        files: {
          'assets/v<%= pkg.version %>/js/<%= pkg.name %>.min.js': ['assets/v<%= pkg.version %>/js/<%= pkg.name %>.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'assets/font/',
            src: ['**'],
            dest: 'assets/v<%= pkg.version %>/font/'
          },
          {
            expand: true,
            cwd: 'assets/img/',
            src: ['**'],
            dest: 'assets/v<%= pkg.version %>/img/'
          },
          {
            expand: true,
            cwd: 'assets/ico/',
            src: ['**'],
            dest: 'assets/v<%= pkg.version %>/ico/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
 
  grunt.registerTask('default', ['clean', 'concat', 'cssmin', 'uglify', 'copy']);
};