/* 
to run this file from command line: npm run gulp (task name)
default task will run if no task name is given
 */

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var fs = require('fs');

var debug = require('gulp-debug');
var runSequence = require('run-sequence');
var swig = require('swig')
var swigGulp = require('gulp-swig');
var sass = require('gulp-sass');
var frontMatter = require('gulp-front-matter');
//var data = require('gulp-data');
var filter = require('gulp-filter');
var s3 = require('gulp-s3-upload')(JSON.parse(fs.readFileSync('./aws.json')));


gulp.task('start-server', function() {
    var express = require('express');
    var app = express();
    var serverPath = path.join(__dirname, '/build');
    app.use(express.static(serverPath));
    app.listen(4000);
});

gulp.task('compile-html', function() {

    function swigSortOnKey(input, sortKey, reverse) {
        if (!input){
            return input
        }
        function compare(a, b) {
            if (a[sortKey] < b[sortKey])
                return -1;
            else if (a[sortKey] > b[sortKey])
                return 1;
            else
                return 0;
        }
        var sorted = input.sort(compare)
        if (reverse){
            return sorted.reverse()
        }
        else {
            return sorted
        }
    }
    
    var swigOpts = {
        setup: function (swig) {
            swig.setFilter('sortOnKey', swigSortOnKey);
        }
    }
    
    return gulp.src('./src/**/*.html')
        .pipe(swigGulp(swigOpts))
        .pipe(gulp.dest('./build'));
});


gulp.task('compile-css', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build'));
});


gulp.task('compile-js', function () {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./build'));
});

gulp.task('compile-images', function () {
    return gulp.src('./src/**/*.jpg')
        .pipe(gulp.dest('./build'));
});

gulp.task('compile-pdf', function () {
    return gulp.src('./src/**/*.pdf')
        .pipe(gulp.dest('./build'))
})

gulp.task('clean', function() {
    return del('./build');
});


gulp.task('compile-all', function(cb) {
    runSequence('clean',
        ['compile-html',
            'compile-css',
            'compile-js',
            'compile-images',
            'compile-pdf'],
        cb);
});


gulp.task('watch', ['compile-all'], function () {

    gulp.watch('./scr/**/*.css', ['compile-css']);

    gulp.watch('./scr/**/*.js', ['compile-js']);

    gulp.watch('./scr/**/*.html', ['compile-html']);
});


gulp.task('server', function(cb) {
    runSequence('compile-all', 'start-server', cb)
});


gulp.task('s3upload', function () {
    return gulp.src('./build/**/*.*')
        .pipe(debug())
        .pipe(s3({
            Bucket: 'www.jamesmariodavis.com',
            ACL: 'public-read'
        }, {
            maxRetries: 5
        }))
});


gulp.task('upload', function (cb) {
    runSequence('compile-all', 's3upload', cb);
});


gulp.task('default', ['compile-all'], function () {
});
