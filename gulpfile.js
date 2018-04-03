var gulp = require('gulp'),
		watch = require('gulp-watch'),
		plumber = require('gulp-plumber'),
		autoprefix = require('gulp-autoprefixer'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		csso = require('gulp-csso'),
		uncss = require('gulp-uncss'),
		rename = require('gulp-rename');

gulp.task('sass', function() {
	return gulp.src('scss/style.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(csso())
		.pipe(autoprefix(['last 10 versions']))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('build',function() {
	return gulp.src('scss/bootstrap/bootstrap.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(uncss({
			html: ['index.html']
		}))
		.pipe(csso())
		.pipe(autoprefix(['last 10 versions']))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.reload({stream: true}));
});


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            notify: false
        }
    });
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch(['index.html','js/main.js'], browserSync.reload);
});