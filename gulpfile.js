// dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();

/*
    general settings

    if you're using local server for your development please uncomment and assign
    server address to proxy prop in settings object (e.g.: 'localhost:8000')
*/

const settings = {
    browserSync: true,
    // proxy: 'localhost:8000'
};

// main paths
const path = {
    // source files
    scss: 'src/scss',
    js_src: 'src/js',

    // production ready assets
    css: 'assets/css',
    js: 'assets/js',
    img: 'assets/img'
};

// browser sync options
const browserSyncOptions = {
    files: [
        path.css,
        path.js,
        path.img,
        './html'
    ]
};

settings.proxy
    ? browserSyncOptions.proxy = settings.proxy
    : browserSyncOptions.server = {baseDir: "./"};

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
gulp.task('scss', () =>
    gulp.src(`${path.scss}/styles.scss`)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.css))
);

// compiling js
gulp.task('js', () =>
    gulp.src(`${path.js_src}/*.js`)
        .pipe(plumber({errorHandler: onError}))
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.js))
);

// optimizing images
gulp.task('image', () =>
    gulp.src(`${path.img}/**/*`)
        .pipe(image())
        .pipe(gulp.dest(path.img))
);

// browser sync
gulp.task('browser-sync', () =>
    browserSync.init(browserSyncOptions)
);

const tasksForWatch = ['scss', 'js'];
const addBrowserSync = browserSyncEnabled => {
    if (browserSyncEnabled) tasksForWatch.push('browser-sync');
};
addBrowserSync(settings.browserSync);

// watching for changes and compiling scss and js
gulp.task('dev', tasksForWatch, () => {
    gulp.watch(`${path.scss}/**/*.scss`, ['scss']);
    gulp.watch(`${path.js_src}/*.js`, ['js']);
});

// compiles scss & js and optimizing images
gulp.task('build', ['scss', 'js', 'image']);
