module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['assets/v<%= pkg.version %>'],
    concat: {
      dist: {
        src: [
          'assets/css/bootstrap.css',
          'assets/css/bootstrap-responsive.css',
          'assets/css/style.css',
          'assets/css/font-awesome.css'
        ],
        dest: 'assets/v<%= pkg.version %>/css/<%= pkg.name %>.css'
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
  grunt.loadNpmTasks('grunt-contrib-copy');
 
  grunt.registerTask('default', ['clean', 'concat', 'cssmin', 'copy']);
};