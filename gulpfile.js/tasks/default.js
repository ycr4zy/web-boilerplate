var gulp = require('gulp');
var runSequence = require('gulp4-run-sequence')

gulp.task('default', function(cb) {
	runSequence(
		'fonts',
		'assets',
		'sounds',
		'scripts',
		'styles',
		'html',
		'watch',
		'browserSync',
		cb
	);
});