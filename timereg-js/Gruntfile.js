module.exports = function (grunt) {



    grunt.initConfig({

        connect: {
            server: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
                            connect.static('build'),
                            connect.static('app'),
                            connect.directory('app')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: 'dist',
                    keepalive: true
                }
            }
        },

        regarde: {
            html: {
                files: 'app/**/*.html',
                tasks: ['livereload']
            },
            scripts: {
                files: 'app/scripts/**/*.js',
                tasks: ['livereload']
            },
            styles: {
                files: 'app/styles/**/*',
                tasks: ['compass', 'livereload']
            }
        },

        open: {
            app: {
                path: 'http://localhost:8000'
            }
        },

        compass: {
            build: {
                options: {
                    sassDir: 'app/styles',
                    cssDir: 'build/styles'
                }
            }
        },

        copy: {
            build: {
                files: [
                    {expand: true, cwd: 'app', src: ['scripts/**/*.js'], dest: 'build'},
                    {expand: true, cwd: 'app', src: ['**/*.html'], dest: 'build'},
                    {expand: true, cwd: 'app', src: ['images/**/*'], dest: 'build'}
                ]
            },
            dist: {
                files: [
                    {expand: true, cwd: 'build', src: ['**/*'], dest: 'dist'},
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('watch', [
        'livereload-start',
        'connect:server',
        'open',
        'regarde'
    ]);

    grunt.registerTask('dist', [
        'compass:build',
        'copy:build',
        'copy:dist'
    ]);

    grunt.registerTask('default', ['watch']);
};