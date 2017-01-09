var gulp = require('gulp');
    postcss = require('gulp-postcss');
    autoprefixer = require('gulp-autoprefixer');
    cleanCSS = require('gulp-clean-css');
    sass = require('gulp-sass');
    sourcemaps = require('gulp-sourcemaps');
    uglify = require('gulp-uglify');
    htmlmin = require('gulp-htmlmin');
    browserSync = require('browser-sync').create();
    runSequence = require('run-sequence');
    cache = require('gulp-cache');
    imagemin = require('gulp-imagemin');
    pump = require('pump');



/*************
 *    CFG    *
 *************/
var serverAddress = 'localhost',
    projectDirectory = '/school-project/';     // just remember to keep the slashes

var sassOptions = {
    input: 'src/scss/**/*.scss',
    output: 'src/css',
    errLogToConsole: true,
    outputStyle: 'expanded'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var browserSyncOptions = {
    files: ["src/css/*.css", "src/js/*.js", "src/pages/*.php", "src/*.php", "src/pages/*.html", "src/*.html"],
    address: serverAddress + projectDirectory + 'src',
    port: 8080
};

var pathsSrc = {
  js: 'src/js',
  css: 'src/css/**/*',
  scss: 'src/scss',
  images: 'src/img'
}

var pathsDist = {
  js: 'dist/js',
  css: 'dist/css',
  scss: 'dist/scss',
  images: 'dist/img'
}

/*************
 *    TASKS  *
 *************/
gulp.task('sass', function() {
    return gulp
        .src(sassOptions.input)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(sassOptions.output))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('uglifyCSS', function() {
    gulp.src(pathsSrc.css)
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(pathsDist.css));
})

gulp.task('uglifyJS', function (cb) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('uglifyHTML', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(pathsDist.images))
});

gulp.task('browserSync', function() {
    browserSync.init({
        files: browserSyncOptions.files,
        proxy: browserSyncOptions.address,
        port: browserSyncOptions.port
    })
})

gulp.task('watch', ['browserSync', 'sass'], function() {
        gulp.watch('src/scss/**/*.scss', ['sass'])
        gulp.watch('src/*.php', browserSync.reload)
        gulp.watch('src/pages/*.php', browserSync.reload)
        gulp.watch('src/js/**/*.js', browserSync.reload)
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})

gulp.task('build', ['sass', 'images', 'uglifyCSS', 'uglifyJS', 'uglifyHTML'], function() {
    return gulp

});
