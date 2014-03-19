var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

// Scripts
gulp.task('scripts', function () {
return gulp.src('public/js/app.js')
	.pipe($.browserify({
		insertGlobals: true,
		transform: ['reactify']
	}))
	//.pipe($.jshint('.jshintrc'))
	//.pipe($.jshint.reporter('default'))
	.pipe(gulp.dest('public/build'))
	.pipe($.size())
	.pipe($.connect.reload());
});

// Clean
gulp.task('clean', function () {
	return gulp.src(['public/build'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['scripts']);

// Default task
gulp.task('default', ['clean'], function () {
	gulp.start('build');
});

// Watch
gulp.task('watch', function () {
	$.nodemon({script: 'app.js', ignore: ['public/build']})
		.on('change', ['build']);
});


