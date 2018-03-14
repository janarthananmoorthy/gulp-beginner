// npm i -g gulp
// npm i gulp gulp-uglify gulp-rename gulp-concat gulp-header gulp-minify-css gulp-watch
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    minifyCSS = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    runSeq = require('run-sequence');

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});
    
gulp.task('scripts', function() {
    gulp.src([
        'node_modules/jquery/dist/jquery.js', // if you need jquery, use "npm install jquery"
        'node_modules/bootstrap/dist/js/bootstrap.js', // if you need bootstrap, use "npm install bootstrap"
        'node_modules/jstree/dist/jstree.js',
        'node_modules/angular/angular.js'
        ])
        .pipe(concat('project.dependencies.js')) // cancatenation to file myproject.js
        .pipe(uglify()) // uglifying this file
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.js
        .pipe(header('/*! <%= pkg.name %> <%= pkg.version %> */\n', {pkg: pkg} )) // banner with version and name of package
        .pipe(gulp.dest('./dist/js/')) // save file to destination directory

    gulp.src([
        'src/js/app.js',
        'src/js/**/*.js'
        ])
        .pipe(concat('myproject.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('styles', function() {
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css', // example with installed bootstrap package
        'node_modules/bootstrap/dist/css/bootstrap-theme.css', // example with installed bootstrap package
        'node_modules/jstree/dist/themes/default/style.css'
        ])
        .pipe(concat('project.dependencies.css')) // concatenation to file myproject.css
        .pipe(minifyCSS({keepBreaks:false})) // minifying file
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.css
        .pipe(header('/*! <%= pkg.name %> <%= pkg.version %> */\n', {pkg: pkg} )) // making banner with version and name of package
        .pipe(gulp.dest('./dist/css/')) // saving file myproject.min.css to this directory

    gulp.src('src/css/**/*.css')
        .pipe(concat('myproject.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('jstree:fonts', function() {
    gulp.src([
        'node_modules/jstree/dist/themes/default/*.png',
        'node_modules/jstree/dist/themes/default/*.gif'
        ])
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('index', function() {
    gulp.src('_index.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('watcher', function() {
    gulp.src('src/js/**/*.js')
        .pipe(watch('src/js/**/*.js', function(event) { // if changed any file in "src/js" (recursively)
            gulp.run('scripts'); // run task "scripts"
        }));
    gulp.src('src/css/**/*.css')
        .pipe(watch('src/css/**/*.css', function(event) {
            gulp.run('styles');
        }));
});

gulp.task('default', function() {
    runSeq('clean', 'scripts', 'styles', 'jstree:fonts', 'index');
});

gulp.task('watch', ['watcher']); // start watcher task "gulp watch"