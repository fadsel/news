/**
 * ownCloud - News
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Bernhard Posselt <dev@bernhard-posselt.com>
 * @copyright Bernhard Posselt 2012, 2014
 */
module.exports = function (grunt) {
    'use strict';

    // load needed modules
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-phpunit');
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-cachebuster');

    grunt.initConfig({
        meta: {
            pkg: grunt.file.readJSON('package.json'),
            version: '<%= meta.pkg.version %>',
            production: 'build/'
        },
        concat: {
            options: {
                // remove license headers
                stripBanners: true
            },
            dist: {
                src: [
                    'app/App.js',
                    'app/Config.js',
                    'app/Run.js',
                    'controller/**/*.js',
                    'filter/**/*.js',
                    'service/**/*.js',
                    'gui/**/*.js',
                    'plugin/**/*.js',
                    'utility/**/*.js',
                    'directive/**/*.js'
                ],
                dest: '<%= meta.production %>app.js'
            }
        },
        ngAnnotate: {
            app: {
                src: ['<%= meta.production %>app.js'],
                dest: '<%= meta.production %>app.js'
            }
        },
        uglify: {
            app: {
                files: {
                    '<%= meta.production %>app.min.js':
                        ['<%= meta.production %>app.js']
                }
            },
            options: {
                sourceMap: true
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            news: {
                files: {'../css/news.min.css': [
                    '../css/app.css',
                    '../css/content.css',
                    '../css/custom.css',
                    '../css/shortcuts.css',
                    '../css/mobile.css',
                    '../css/navigation.css',
                    '../css/settings.css',
                    '../css/explore.css'
                ]}
            }
        },
        wrap: {
            basic: {
                src: ['<%= meta.production %>app.js'],
                dest: '<%= meta.production %>app.js',
                options: {
                    wrapper: [
                        '(function(navigator, window, document, angular, $, ' +
                        'OC, csrfToken, url, undefined){' +
                        '\n\n\'use strict\';\n\n',

                        '\n})(navigator, window, document, angular, jQuery, ' +
                        ' OC, oc_requesttoken, url);'
                    ]
                }
            }
        },
        jshint: {
            app: {
                src: [
                    'Gruntfile.js',
                    'app/App.js',
                    'app/Config.js',
                    'app/Run.js',
                    'filter/**/*.js',
                    'service/**/*.js',
                    'controller/**/*.js',
                    'directive/**/*.js',
                    'tests/**/*.js',
                    'gui/**/*.js',
                    'plugin/**/*.js',
                    'admin/**/*.js'
                ]
            },
            options: {
                jshintrc: true
            }
        },
        watch: {
            concat: {
                files: [
                    '../css/*.css',
                    '!../css/*.min.css',
                    'admin/**/*.js',
                    'tests/**/*.js',
                    'app/**/*.js',
                    'controller/**/*.js',
                    'utility/**/*.js',
                    'directive/**/*.js',
                    'filter/**/*.js',
                    'service/**/*.js',
                    'gui/**/*.js',
                    'plugin/**/*.js',
                    '../templates/**/*.php'
                ],
                tasks: ['default'],
                options: {
                    livereload: true
                }
            },
            phpunit: {
                files: [
                    '../**/*.php'
                ],
                tasks: ['phpunit:unit']
            },
            phpintegration: {
                files: [
                    '../**/*.php'
                ],
                tasks: ['phpunit:integration']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },
            continuous: {
                configFile: 'karma.conf.js',
                browsers: ['Firefox'],
                singleRun: true,
            }
        },
        phpunit: {
            unit: {
                options: {
                    colors: true,
                    configuration: '../phpunit.xml'
                }
            },
            coverageUnit: {
                options: {
                    colors: true,
                    configuration: '../phpunit.xml',
                    coverageClover: '../coverage.clover'
                }
            },
            integration: {
                options: {
                    colors: true,
                    configuration: '../phpunit.integration.xml'
                }
            },
        },
        /* jshint camelcase: false */
        protractor_webdriver: {
            app: {

            }
        },
        protractor: {
            firefox: {
                options: {
                    configFile: 'protractor.conf.js'
                }
            },
        },
        connect: {
            server: {
                options: {
                    base: 'tests/static/'
                }
            }
        },
        php: {
            dist: {
                options: {
                    port: 8080,
                    keepalive: true,
                    open: true,
                    base: '../../../'
                }
            }
        },
        cachebuster: {
            build: {
                options: {
                    format: 'json',
                    basedir: '..'
                },
                src: [
                    '../**',
                    // js
                    '!../js/**',
                    '../js/build/*.min.js',
                    '../js/vendor/**/*.min.js',
                    '!../js/vendor/jquery/**',
                    '!../js/vendor/js-url/lib/**',
                    '!../js/vendor/angular-mocks/**',
                    // css
                    '!../css/**',
                    '../css/*.min.css',
                    // l10n
                    '!../l10n/**',
                    // appinfo
                    '!../appinfo/checksum.json',
                    // build
                    '!../build/**',
                    // vendor
                    '!../vendor/ezyang/htmlpurifier/**',
                    '../vendor/ezyang/htmlpurifier/**/*.php',
                    '../vendor/ezyang/htmlpurifier/**/*.json',
                    '!../vendor/ezyang/htmlpurifier/extras/**',
                    '!../vendor/ezyang/htmlpurifier/maintenance/**',
                    '!../vendor/ezyang/htmlpurifier/plugins/**',
                    '!../vendor/ezyang/htmlpurifier/maintenance/**',
                    '!../vendor/ezyang/htmlpurifier/configdoc/**',
                    '!../vendor/ezyang/htmlpurifier/benchmarks/**',
                    '!../vendor/ezyang/htmlpurifier/smoketests/**',
                    '!../vendor/fguillot/picofeed/**',
                    '../vendor/fguillot/picofeed/**/*.php',
                    '../vendor/fguillot/picofeed/**/*.json',
                    '!../vendor/pear/net_url2/**',
                    '../vendor/pear/net_url2/**/*.php',
                    '../vendor/pear/net_url2/**/*.json',
                    // bin
                    '!../bin/updater/dist',
                    '!../**/*.pyc',
                    '!../**/PKG_INFO',
                    '!../**/__pycache__',
                    '!../bin/git/**',
                    // generic
                    '!../**/*.md',
                    '!../**/phpunit*',
                    '!../**/*.log',
                    '!../**/*.sw',
                    '!../**/Makefile',
                    '!../**/docs/**',
                    '!../**/tests/**',
                ],
                dest: '../appinfo/checksum.json'
            }
        }
    });

    // make tasks available under simpler commands
    grunt.registerTask('default', ['jshint', 'concat',  'wrap', 'ngAnnotate',
                                   'uglify', 'cssmin']);
    grunt.registerTask('dev', ['watch:concat']);
    grunt.registerTask('dev-js-unit', ['karma:unit']);
    grunt.registerTask('dev-php-unit', ['watch:phpunit']);
    grunt.registerTask('dev-php-integration', ['watch:phpintegration']);

    grunt.registerTask('js-unit', ['default', 'karma:continuous']);
    grunt.registerTask('php-unit', ['phpunit:coverageUnit']);
    grunt.registerTask('php-integration', ['phpunit:integration']);

    grunt.registerTask('acceptance', ['protractor_webdriver', 'connect',
                                      'protractor']);

};