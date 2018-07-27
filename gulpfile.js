// dependencies
const
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	babel = require('gulp-babel'),
	image = require('gulp-image');

// main paths
const path = {
	// source
	scss: 'src/scss',
	js_src: 'src/js',

	// assets
	css: 'assets/css',
	js: 'assets/js',
	img: 'assets/img'
};

// error handler
let onError = function (err) {
	notify.onError({
		title: 'Gulp',
		subtitle: 'Failure!',
		message: 'Error: <%= error.message %>',
		sound: 'Basso'
	})(err);
	this.emit('end');
};

// compiling css
gulp.task('scss', () => {
	return gulp.src(`${path.scss}/styles.scss`)
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: '*'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.css));
});

// compiling js
gulp.task('js', () =>
	gulp.src(`${path.js_src}/*.js`)
		.pipe(plumber({errorHandler: onError}))
		.pipe(babel({presets: ['env']}))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.js))
);

// optimizing images
gulp.task('image', function () {
	gulp.src(`${path.img}/**/*`)
		.pipe(image())
		.pipe(gulp.dest(path.img));
});

// "watch" task for watching for changes and compiling scss and js
gulp.task('watch', ['scss', 'js'], () => {
	gulp.watch(`${path.scss}/**/*.scss`, ['scss']);
	gulp.watch(`${path.js_src}/*.js`, ['js']);
});

// "build" task for compiling scss and js and optimizing images
gulp.task('build', ['scss', 'js', 'image']);
