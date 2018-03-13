'use strict';

// Node/Gulp plugins
const gulp    = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const merge   = require('merge-stream');
const plugins = require('gulp-load-plugins')({ camelize: true });
const through = require('through2');
const gutil = require("gulp-util");


// CSS task
gulp.task('styles', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(plugins.plumber())
    .pipe(plugins.sass({
      outputStyle: 'compressed' }))
    .pipe(plugins.postcss([
      require('autoprefixer')({ browsers: ['last 4 versions', 'ie >= 9', 'and_chr >= 2.3'] }),
      require('postcss-flexbugs-fixes')]
    ))
    .pipe(plugins.rename('style.min.css'))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('dist/css'))
    .pipe(plugins.size({ title: 'style' }));
});


// Scripts task
gulp.task('scripts', () => {
  return gulp.src([
      'src/js/**/*.js',
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.concat('fiwidebugger.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('dist/'))
    .pipe(plugins.size({ title: 'scripts' }));
})


// Build task
gulp.task('build', ['styles', 'scripts']);

// Watch task
gulp.task('watch', () => {
  gulp.watch(['src/js/*.js'], ['scripts']);
});


//
//var uncss = require('gulp-uncss');
//var rename = require('gulp-rename');
//
//gulp.task('uncss', function () {
//
//    gulp.src('dist/css/styles.min.css')
//        .pipe(uncss({
//    	ignore: [],
//        html: []
//        })).pipe(rename({
//            suffix: '.clean'
//        }))
//
//    .pipe(gulp.dest('dist/css/'));
//
//});

// Default task w UNCSS
//gulp.task('default', ['build', 'watch', 'uncss']);

// Default task
gulp.task('default', ['build', 'watch']);
