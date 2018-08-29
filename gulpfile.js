var path = require('path'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    html2js = require('gulp-html2js');
    eslint = require('gulp-eslint');


var config = {
    javascript: {
        path: {
            src: path.join('src/js'),
            dist: path.join('dist')
        }
    },
    sass: {
        path: {
            src: path.join('src/sass'),
            dist: path.join('dist')
        }
    }
};

var onJSError = function (err) {
    notify({
        message: err
    });
};

gulp.task('styles:sass', function () {

    return gulp.src(path.join(config.sass.path.src, '**', '*.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.sass.path.dist));
});

gulp.task('javascript', function () {
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/custom-event-polyfill/custom-event-polyfill.js', './node_modules/js-cookie/src/js.cookie.js', 'src/js/templates.js','src/js/script.js', 'src/langs/hu.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.javascript.path.dist))
});

gulp.task('views:compile', function () {
    gulp.src('src/html/*.html')
    .pipe(html2js('templates.js', {
      adapter: 'javascript',
      base: 'src/html',
      name: 'gdpr-cookie-notice-templates'
    }))
    .pipe(gulp.dest('src/js/'));
});

gulp.task('lint', () => {
    return gulp.src(['src/js/script.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
    gulp.start('styles:sass');
    gulp.start('views:compile');
    gulp.start('javascript');
});
