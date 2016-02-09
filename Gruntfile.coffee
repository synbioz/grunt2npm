module.exports = (grunt) ->

  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-slim"
  grunt.loadNpmTasks "grunt-contrib-stylus"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-sftp-deploy"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks 'grunt-contrib-concat'

  # Project configuration.
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    slim: # Task
      build: # Target
        files: # Dictionary of files
          "build/index.html": "src/index.slim"

    stylus:
      build:
        files:
          "build/style.css": "src/style.styl"
        options:
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd, HH:mm") %> */\n'
          compress: true
          include: true

    concat:
      options:
        separator: ';'
      build:
        src: [
            "src/scripts/vendor/jquery.js",
            "src/scripts/vendor/jcanvas.min.js",
            "src/scripts/vendor/jquery.velocity.min.js",
            "src/scripts/vendor/velocity.ui.js",
            "src/scripts/script.js"
          ],
        dest: 'build/script.js'


    uglify:
      build:
        files:
          'build/script.js': ['build/script.js']

    "sftp-deploy":
      build:
        auth:
          host: "sftp.dc0.gpaas.net"
          port: 22
          authKey: "victor"

        src: "build"
        dest: "/lamp0/web/vhosts/victordarras.fr/htdocs"
        server_sep: "/"

    copy:
      build:
        files: [
          {
            src: "src/contact.php"
            dest: "build/contact.php"
          },
          {
            src: "src/images/favicon.ico"
            dest: "build/favicon.ico"
          },
          {
            src: "src/images/victor.jpg"
            dest: "build/images/victor.jpg"
          }
        ]

    watch:
      build:
        files: ["src/**/*"]
        tasks: ["slim", "stylus", "concat"]

  # Default task(s).
  grunt.registerTask "default", ["watch"]
  grunt.registerTask "build", ["slim", "stylus", "concat", 'uglify', "copy"]
  grunt.registerTask "deploy", ["build", "sftp-deploy"]