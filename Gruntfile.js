// module.exports = function(grunt) {
//   // TODO: This is a sample grunt file.
//   // Update file paths and tasks for this specific project as tasks are needed.
//   // Webpack is being used to concat and uglify js files, so grunt
//   // would only be needed for other kinds of repetitive deployment tasks.

//   grunt.initConfig({
//     pkg: grunt.file.readJSON('package.json'),
//     concat: {
//       options: {
//         separator: ';',
//       },
//       dist: {
//         src: ['client/lib/**/*.js', 'client/**/*.js', 'lib/*.js'],
//         dest: 'client/dist/built.js',
//       },
//     },
//     nodemon: {
//       dev: {
//         script: 'server.js'
//       }
//     },
//     uglify: {
//       'my_target': {
//         files: {
//           'public/dist/output.min.js': ['public/dist/built.js']
//         }
//       }
//     },
//     eslint: {
//       target: ['client/app.js']
//     },
//     cssmin: {
//     },
//     watch: {
//       scripts: {
//         files: [
//           'client/**/*.js',
//           'public/lib/**/*.js',
//         ],
//         tasks: [
//           'concat',
//           'uglify'
//         ]
//       },
//       css: {
//         files: 'public/*.css',
//         tasks: ['cssmin']
//       }
//     },
//     server: {
//       port: grunt.option('port') || 4568
//     },
//     shell: {
//       prodServer: {
//       }
//     },
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');
//   grunt.loadNpmTasks('grunt-contrib-cssmin');
//   grunt.loadNpmTasks('grunt-eslint');
//   grunt.loadNpmTasks('grunt-shell');
//   grunt.loadNpmTasks('grunt-contrib-nodemon');
//   grunt.loadNpmTasks('grunt-nodemon');

//   grunt.registerTask('server-dev', function (target) {
//     // Running nodejs in a different process and displaying output on the main console
//     var nodemon = grunt.util.spawn({
//       cmd: 'grunt',
//       grunt: true,
//       args: 'nodemon'
//     });

//     nodemon.stdout.pipe(process.stdout);
//     nodemon.stderr.pipe(process.stderr);

//     grunt.task.run([ 'watch' ]);
//   });

// };
