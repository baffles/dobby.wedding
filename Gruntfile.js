module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean')

	grunt.loadNpmTasks('grunt-aws')
	grunt.loadNpmTasks('grunt-exec')
	grunt.loadNpmTasks('grunt-git')

	grunt.loadNpmTasks('grunt-contrib-imagemin')
	grunt.loadNpmTasks('grunt-contrib-htmlmin')
	grunt.loadNpmTasks('grunt-contrib-cssmin')
	grunt.loadNpmTasks('grunt-contrib-uglify')

	grunt.initConfig({
		aws: grunt.file.readJSON('.aws.json'),
		clean: [ 'build' ],
		exec: {
			wsbuild: {
				command: 'wintersmith build'
			}
		},
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					cwd: 'build/',
					src: [ 'img/**/*.jpg' ],
					expand: true,
					dest: 'build/'
				}]
			}
		},
		htmlmin: {
			html: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					minifyJS: true,
					minifyCSS: true
				},
				files: [{
					cwd: 'build/',
					src: [ '**/*.html' ],
					expand: true,
					dest: 'build/'
				}]
			}
		},
		cssmin: {
			dist: {
				cwd: 'build/css',
				src: [ '**/*.css' ],
				expand: true,
				dest: 'build/css'
			}
		},
		uglify: {
			dist: {
				files: {
					'build/js/main.js': 'build/js/main.js'
				}
			}
		},
		s3: {
			options: {
				accessKeyId: "<%= aws.key %>",
				secretAccessKey: "<%= aws.secret %>",
				access: 'public-read'
			},
			staging: {
				cwd: 'build/',
				src: [ 'css/**/*', 'img/**/*', 'js/main.js', '*.html' ],
				expand: true,

				options: {
					bucket: "<%= aws.stagingOptions.bucket %>"
				}
			},
			production: {
				options: {
					bucket: "<%= aws.productionOptions.bucket %>"
				}
			}
		},
		gittag: {
			deployment: {
				options: {
					tag: "<%= grunt.template.today('yyyy.mm.dd') %>",
					message: "Deployment push on <%= grunt.template.today('mmmm d, yyyy') %>."
				}
			}
		}
	})

	grunt.registerTask('pre-build', [ 'clean' ])
	grunt.registerTask('post-build', [ 'imagemin', 'htmlmin', 'cssmin', 'uglify' ])

	grunt.registerTask('build', [ 'pre-build', 'exec:wsbuild', 'post-build' ])

	grunt.registerTask('stage', [ 'build', 's3:staging' ])
	grunt.registerTask('deploy', [ 'build', 's3:production', 'gittag:deployment' ])
}