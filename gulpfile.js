/**
 * Dependencies
 */
const { series, parallel, watch, src, dest } = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const notifier = require('node-notifier');

/**
 * Main config where you can define paths and browserSync settings
 * */
const config = {};

/** 
 * Source and distribition files folders 
 * */
config.paths = {
    src: {
        scss: 'src/scss',
        js: 'src/js',
    },
    dist: {
        css: 'assets/css',
        js: 'assets/js',
        img: 'assets/img'
    }
}

/** 
 * BrowserSync settings
 * 
 * uncomment "proxy" option and comment out "server" one
 * if you're using a local server
 * */
config.browserSync = {
    // proxy: 'localhost:8000'
    server: { baseDir: "./" },
    files: [
        config.paths.dist.css,
        config.paths.dist.js,
        '**/*.html'
    ]
};

/**
 * ------------------------------------------
 * ------------>>> Gulp tasks <<<------------
 * ------------------------------------------
 */

const handleError = (err, title) => {
    console.log(err);

    notifier.notify({
        title,
        message: err.message,
        sound: 'Basso'
    });
}

const compileSCSS = () => {
    return src(`${config.paths.src.scss}/styles.scss`)
        .pipe(sass().on('error', err => handleError(err, 'SCSS Compile Error')))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: '*' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(config.paths.dist.css))
}

const compileJS = () => {
    return src(`${config.paths.src.js}/*.js`, { read: false })
        .pipe(tap(file => {
            file.contents = browserify(file.path, { debug: true })
                .transform('babelify', { presets: ['@babel/preset-env'] })
                .bundle();
        }))
        .pipe(buffer())
        .pipe(uglify().on('error', err => handleError(err, 'JS Compile Error')))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(config.paths.dist.js));
}

const optimizeImages = () => {
    return src(`${config.paths.dist.img}/**/*`)
        .pipe(image())
        .pipe(dest(config.paths.dist.img));
}

const liveReload = () => {
    browserSync.init(config.browserSync)
}

/**
 * Watch files for changes
 */
const watchForChanges = () => {
    watch(`${config.paths.src.js}/**/*.js`, compileJS)
    watch(`${config.paths.src.scss}/**/*.scss`, compileSCSS)
};

/**
 * Compile sources + watch for changes
 * 2 versions with/without live reload
 */
const compileWatch = series(compileSCSS, compileJS, watchForChanges);
const compileWatchReload = series(compileSCSS, compileJS, parallel(watchForChanges, liveReload));

/**
 * Build project for production (compile JS ans SCSS + optimize images)
 */
const build = series(compileSCSS, compileJS, optimizeImages);

/**
 * Gulp tasks you can use in terminal by typing gulp + task name
 * For example: gulp optimizeImages
 */
exports.compileSCSS = compileSCSS;
exports.compileJS = compileJS;
exports.optimizeImages = optimizeImages;
exports.liveReload = liveReload;

exports.compileWatch = exports.devNoReload = compileWatch;
exports.compileWatchReload = exports.dev = compileWatchReload;
exports.build = build;
