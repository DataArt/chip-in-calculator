'use strict'

gulp = require "gulp"
runSequence = require 'run-sequence'
clean = require 'gulp-rimraf'
jade = require 'gulp-jade'
inject = require 'gulp-inject'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
coffee = require 'gulp-coffee'
styl = require 'gulp-styl'
gulpIf = require "gulp-if"

src = "src"
dest = "build"
bowerPath = "./bower_components"

gulp.task 'clean:build', ->
    gulp.src(dest, {read: false})
    .pipe(clean())

gulp.task 'copy:js', ['clean:build'], ->


gulp.task 'copy:html', ['clean:build'], ->
    gulp.src([
        "#{src}/**/*.jade"
        "#{src}/**/*.html"
    ])
    .pipe(gulpIf(/[.]jade/,jade()))
    .pipe(gulp.dest("#{dest}"))


gulp.task 'copy:css', ['clean:build'], ->


gulp.task 'inject', ->
    sources = gulp.src(
        [
            "#{dest}/css/**/*.css"
            "#{dest}/js/**/*.js"
        ],
        { read: false }
    )
    gulp.src("#{dest}/index.html")
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(dest))

gulp.task 'watch', ->
    gulp.watch(
        [
            "#{src}/**/*.jade"
            "#{src}/**/*.styl"
            "#{src}/**/*.coffee"
            "#{src}/**/*.html"
        ],
        [
            'copy:html'
        ]
    )

gulp.task 'default', (callback) ->
    runSequence(
        'clean:build',
        #'copy:js',
        'copy:html',
        #'copy:css',
        #'inject'
        'watch'
    )
