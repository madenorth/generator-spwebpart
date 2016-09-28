var gulp = require('gulp');
var tsc = require('gulp-typescript');
var concat  = require('gulp-concat');
var spsync = require('gulp-spsync-creds').sync;
var creds = require('./sync.config.json');
var mainBowerFiles = require('gulp-main-bower-files');
var tsProject = tsc.createProject("tsconfig.json");
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');

gulp.task("upload",['compile'],function () {
    gulp.src('./App/**/*.*')
    .pipe(spsync({
        "username": creds.username,
        "password": creds.password,
        "site": creds.site
    }))
    
});

gulp.task('compile', ['compiletemplates','mainbowerfiles'], function() {
    var tsResult =  gulp.src(['./src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject))
     .on('error', function (error) {
            console.log('Typescript compilation exited with ' + error);
            process.exit(1);
       });

    return tsResult
        .pipe(concat('<%= wpname %>.js'))
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest('App/Style Library/wwTest'))
        .on('error', function() { process.exit(1) });
});

gulp.task('compiletemplates', function () {
  return gulp.src(['src/templates/**/*.html','src/libraries/templates/*.html'])
    .pipe(templateCache('Templates.ts', {
      "module": "webpartWidget",
      "standalone": false,
      "templateHeader": 'namespace LccWebParts { angular.module("webpartWidget").run(function($templateCache) {',
      "templateFooter": '}); }'
    }))
    .pipe(gulp.dest('src/templates'));
});

gulp.task('mainbowerfiles', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('App/Style Library/wwTest/libs'));
});

gulp.task('default', ['mainbowerfiles','compile','upload']);