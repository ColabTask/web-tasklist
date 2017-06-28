var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var path = "./src/assets/"
gulp.task('sass', function () {
    return gulp.src(path + 'scss/app.scss')
        .pipe(concat('style.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path + 'css'));
});

gulp.task('watch', ['sass'], function() {
    gulp.watch(path + 'scss/**/*.scss', ['sass']);
});
