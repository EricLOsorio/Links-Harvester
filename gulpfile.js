var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    cssmin = require('gulp-cssmin'),
    runSequence = require('run-sequence');

gulp.task('build', function(callback){

  runSequence( 'minifyCSS', 'jslint', 'minifyJS',callback);

});


gulp.task('minifyJS', function() {

  return browserify({entries: ['./regex.js','./regexWorker.js'], extensions: ['.js'],debug: true})
         .transform("babelify", {presets: ["es2015"] })
	 .bundle()
	 .pipe(source('bundle.js'))
	 .pipe(buffer())
	 .pipe(uglify())
	 .pipe(gulp.dest('dest'));

}),


gulp.task('minifyCSS', function () {

  gulp.src('./*.css')
      .pipe(cssmin() )
      .pipe(gulp.dest('./dest'));
});

gulp.task('jslint', function () {

  return gulp.src("./*.js")
             .pipe(eslint() )
	     .pipe(eslint.format() )
	     .pipe(eslint.failAfterError() );

});

gulp.task('jshint', function() {

  return gulp.src('./*.js')
             .pipe(jshint())
	     .pipe(jshint.reporter('default'));

});

