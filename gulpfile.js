var Vulcanize = require('vulcanize');
var gulp = require('gulp');
var through = require('through2');
var path = require('path');

var vulcan = new Vulcanize({
    excludes: [],
    stripExcludes: [],
    inlineScripts: false,
    inlineCss: false,
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

gulp.task('default', function() {
    gulp.src('src/index.html')
        .pipe(vulcanizeWrapper())
        .pipe(gulp.dest('build'))
});

