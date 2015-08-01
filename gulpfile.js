var Vulcanize = require('vulcanize');
var gulp = require('gulp');
var through = require('through2');
var path = require('path');
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var crisper = require('gulp-crisper');
var uglifyJs = require('gulp-uglify');
var uglifyHtml = require('gulp-minify-html');
var uglifyCss = require('gulp-minify-css');

var vulcan = new Vulcanize({
    inlineScripts: true,
    inlineCss: true,
    stripComments: true
});

var vulcanizeWrapper = function() {
    return through.obj(function(file, encoding, callback) {
        var gulpContext = this;
        vulcan.process(file.path, function(err, data) {
            file.contents = new Buffer(data);
            gulpContext.push(file);
            callback();
        });
    });
};

gulp.task('clean', function(cb){
    del([
        'build/**/*'
    ], cb)
});
gulp.task('vulcanize', function(){
    return gulp.src('src/index.html')
        .pipe(vulcanizeWrapper())
        .pipe(crisper())
        .pipe(gulp.dest('build'))
});
gulp.task('minify:css', function(){
    return gulp.src('src/**/*.css')
        .pipe(uglifyCss())
        .pipe(gulp.dest('build'));
});
gulp.task('minify:js', function(){
    return gulp.src('build/**/*.js')
        .pipe(uglifyJs())
        .pipe(gulp.dest('build'));
});
gulp.task('minify:html', function(){
    return gulp.src('build/**/*.html')
        .pipe(uglifyHtml())
        .pipe(gulp.dest('build'));
});

gulp.task('default', function() {
    return runSequence(
        'clean',
        'vulcanize',
        //'minify:css',
        'minify:js',
        'minify:html'
    );
});

