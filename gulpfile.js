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
    karma = require('karma').Server,
    open = require('gulp-open'),
    connect = require('gulp-connect')
    runSeq = require('run-sequence');

gulp.task('open', function(){
    gulp.src('dist/index.html')
        .pipe(open({uri: 'http://localhost:8001/'}));
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 8001,
        livereload: true
    });
});


gulp.task('test', function(done) {
    return karma.start({
      configFile:  __dirname + '/test/config/karma.conf.js',
      singleRun: true
    }, function() {
        done();
    });
});

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});
    
gulp.task('scripts:dependencies', function() {
    gulp.src([
        'node_modules/jquery/dist/jquery.js', // if you need jquery, use "npm install jquery"
        'node_modules/bootstrap/dist/js/bootstrap.js', // if you need bootstrap, use "npm install bootstrap"
        'node_modules/jstree/dist/jstree.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js'
        ])
        .pipe(concat('project.dependencies.js')) // cancatenation to file myproject.js
        .pipe(uglify()) // uglifying this file
        .pipe(rename({suffix: '.min'})) // renaming file to myproject.min.js
        .pipe(header('/*! <%= pkg.name %> <%= pkg.version %> */\n', {pkg: pkg} )) // banner with version and name of package
        .pipe(gulp.dest('./dist/js/')) // save file to destination directory
});

gulp.task('scripts', function() {
    gulp.src([
        'src/js/app.js',
        'src/js/jstree.js',
        'src/js/controller/myController.js'
        ])
        .pipe(concat('myproject.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});

gulp.task('styles:dependencies', function() {
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
});

gulp.task('styles', function() {
    gulp.src('src/css/**/*.css')
        .pipe(concat('myproject.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(connect.reload());
});

gulp.task('jstree:fonts', function() {
    gulp.src([
        'node_modules/jstree/dist/themes/default/*.png',
        'node_modules/jstree/dist/themes/default/*.gif'
        ])
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('index', function() {
    // gulp.src('src/partials/**/*.html')
    //     .pipe(gulp.dest('./dist/partials'))
        
    gulp.src('_index.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./dist'))
});

// gulp.task('watcher', function() {
//     gulp.src('src/js/**/*.js')
//         .pipe(watch('src/js/**/*.js', function(event) { // if changed any file in "src/js" (recursively)
//             gulp.run('scripts'); // run task "scripts"
//         }));
//     gulp.src('src/css/**/*.css')
//         .pipe(watch('src/css/**/*.css', function(event) {
//             gulp.run('styles');
//         }));
// });

gulp.task('default', function() {
    runSeq('clean', 'scripts:dependencies', 'scripts', 'styles:dependencies', 'styles', 'jstree:fonts', 'index', 'connect', 'watch');
});

// gulp.task('watch', ['watcher']); // start watcher task "gulp watch"

gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/css/**/*.css', ['styles']);
});