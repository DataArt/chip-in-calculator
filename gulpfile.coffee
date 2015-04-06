'use strict'
# Include Gulp & Tools We'll Use
gulp = require('gulp')
$ = require('gulp-load-plugins')()
del = require('del')
runSequence = require('run-sequence')
browserSync = require('browser-sync')
pagespeed = require('psi')
reload = browserSync.reload
merge = require('merge-stream')
path = require('path')
gulpIf = require 'gulp-if'
jade = require 'gulp-jade'

AUTOPREFIXER_BROWSERS = [
  'ie >= 10'
  'ie_mob >= 10'
  'ff >= 30'
  'chrome >= 34'
  'safari >= 7'
  'opera >= 23'
  'ios >= 7'
  'android >= 4.4'
  'bb >= 10'
]

styleTask = (stylesPath, srcs) ->
  gulp.src(srcs.map((src) ->
    path.join 'app', stylesPath, src
  ))
  .pipe($.changed(stylesPath, extension: '.css'))
  .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
  .pipe(gulp.dest('.tmp/' + stylesPath))
  .pipe($.if('*.css', $.cssmin()))
  .pipe(gulp.dest('dist/' + stylesPath))
  .pipe $.size(title: stylesPath)

# Compile and Automatically Prefix Stylesheets
gulp.task 'styles', ->
  styleTask 'styles', ['**/*.css']

gulp.task 'elements', ->
  styleTask 'elements', ['**/*.css']

gulp.task 'jshint', ->
  gulp.src([
    'app/scripts/**/*.js'
    'app/elements/**/*.js'
    'app/elements/**/*.html'
  ])
  .pipe(reload(stream: true, once: true))
  .pipe($.jshint.extract())
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))

gulp.task 'images', ->
  gulp.src('app/images/**/*')
  .pipe($.cache($.imagemin(progressive: true, interlaced: true)))
  .pipe(gulp.dest('dist/images'))
  .pipe($.size(title: 'images'))

gulp.task 'copy', ->
  app = gulp.src([
      'app/*'
      '!app/test'
      'node_modules/apache-server-configs/dist/.htaccess'
  ], dot: true)
  .pipe(gulpIf /[.]jade/, jade())
  .pipe(gulp.dest('dist'))

  bower = gulp.src(['bower_components/**/*'])
  .pipe(gulp.dest('dist/bower_components'))

  elements = gulp.src(['app/elements/**/*.html'])
  .pipe(gulp.dest('dist/elements'))

  vulcanized = gulp.src(['app/elements/elements.html'])
  .pipe($.rename('elements.vulcanized.html'))
  .pipe(gulp.dest('dist/elements'))

  merge(app, bower, elements, vulcanized)
  .pipe($.size(title: 'copy'))

gulp.task 'fonts', ->
  gulp.src(['app/fonts/**'])
  .pipe(gulp.dest('dist/fonts'))
  .pipe($.size(title: 'fonts'))

gulp.task 'html', ->
  assets = $.useref.assets(searchPath: [
    '.tmp'
    'app'
    'dist'
  ])
  gulp.src([
    'app/**/*.html'
    '!app/{elements,test}/**/*.html'
  ])
  .pipe($.if('*.html', $.replace('elements/elements.html', 'elements/elements.vulcanized.html')))
  .pipe(assets)
  .pipe($.if('*.js', $.uglify(preserveComments: 'some')))
  .pipe($.if('*.css', $.cssmin()))
  .pipe(assets.restore())
  .pipe($.useref())
  .pipe($.if('*.html', $.minifyHtml(quotes: true, empty: true, spare: true)))
  .pipe(gulp.dest('dist')).pipe $.size(title: 'html')

gulp.task 'vulcanize', ->
  DEST_DIR = 'dist/elements'
  gulp.src('dist/elements/elements.vulcanized.html')
  .pipe($.vulcanize(dest: DEST_DIR, strip: true, inline: true))
  .pipe(gulp.dest(DEST_DIR))
  .pipe($.size(title: 'vulcanize'))

gulp.task 'clean', del.bind(null, [
  '.tmp'
  'dist'
])

gulp.task 'serve', [
  'styles'
  'elements'
], ->
  browserSync
    notify: false
    server:
      baseDir: [
        '.tmp'
        'app'
      ]
      routes:
        '/bower_components': 'bower_components'
  gulp.watch ['app/**/*.html'], reload
  gulp.watch ['app/styles/**/*.css'], ['styles', reload]
  gulp.watch ['app/elements/**/*.css'], ['elements', reload]
  gulp.watch ['app/{scripts,elements}/**/*.js'], ['jshint']
  gulp.watch ['app/images/**/*'], reload
  return

gulp.task 'serve:dist', ['default'], ->
  browserSync
    notify: false
    server: 'dist'
  return
# Build Production Files, the Default Task
gulp.task 'default', ['clean'], (cb) ->
  runSequence [
    'copy'
    'styles'
  ], 'elements', [
    'jshint'
    'images'
    'fonts'
    'html'
  ], 'vulcanize', cb
  return

gulp.task 'pagespeed', (cb) ->
  # TODO: Update the below URL to the public URL of your site
  pagespeed.output 'example.com', {strategy: 'mobile'}, cb
  return

# Load custom tasks from the `tasks` directory
try
  require('require-dir') 'tasks'
catch err
