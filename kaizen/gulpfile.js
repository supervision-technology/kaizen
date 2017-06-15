//*****************************************************************
// PLUGIN VARIABLES
//*****************************************************************
var
        gulp = require('gulp'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        cleanCSS = require('gulp-clean-css'),
        htmlmin = require('gulp-htmlmin'),
        debug = require('gulp-debug'),
        ngAnnotate = require('gulp-ng-annotate'),
        inject = require('gulp-inject'),
        browserSync = require('browser-sync').create(),
        clean = require('gulp-clean'),
        sass = require('gulp-sass'),
        less = require('gulp-less');



//*****************************************************************
// BUILD HTML
//*****************************************************************
gulp.task('build-html', function () {

    return  gulp.src('src/site/**/*.html')
            .pipe(debug())
            .pipe(inject(gulp.src([
                'src/main/resources/static/styles/vendor.min.css',
                'src/main/resources/static/styles/theme.min.css',
                'src/main/resources/static/styles/app.min.css',
                'src/main/resources/static/scripts/vendor.min.js',
                'src/main/resources/static/scripts/theme.min.js',
                'src/main/resources/static/scripts/app.min.js'
            ]),
                    {
                        ignorePath: 'src/main/resources/static/', addRootSlash: false
                    }
            ))
            .pipe(htmlmin({collapseWhitespace: false}))
            .pipe(gulp.dest('src/main/resources/static'));
});



//*****************************************************************
// BUILD JS
//*****************************************************************
gulp.task('build-js', function () {
    //vendor
    gulp.src([
        "bower_components/jquery-dist/jquery.min.js",
        "bower_components/angular/angular.min.js",
        "bower_components/angular-route/angular-route.min.js",
        "bower_components/angular-animate/angular-animate.min.js",
        "bower_components/angular-sanitize/angular-sanitize.min.js",
        "bower_components/angular-cookies/angular-cookies.min.js",
        "bower_components/angular-base64/angular-base64.js",
        "bower_components/angular-bootstrap/ui-bootstrap.min.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "bower_components/angular-ui-notification/dist/angular-ui-notification.min.js",
        "bower_components/bootstrap/dist/js/bootstrap.min.js",
        "bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js",
        "bower_components/fastclick/click/fastclick.js",
        "bower_components/angular-filter/dist/angular-filter.js",
        "bower_components/angular-file-saver/dist/angular-file-saver.js",
        "bower_components/angular-file-saver/dist/angular-file-saver.bundle.js"
    ])
            .pipe(debug())
            .pipe(concat('vendor.min.js'))
            .pipe(gulp.dest('src/main/resources/static/scripts'));

    //theme
    gulp.src('src/site/scripts/theme/*.js')
            .pipe(debug())
            .pipe(concat('theme.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('src/main/resources/static/scripts'));


    //app
    return gulp.src('src/site/app/**/*.js')
            .pipe(debug())
            .pipe(concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(gulp.dest('src/main/resources/static/scripts'));
});



//*****************************************************************
// BUILD CSS
//*****************************************************************
gulp.task('build-css', function () {
    //vendor
    gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/animate.css/animate.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css',
        'bower_components/angular-ui-notification/dist/angular-ui-notification.min.css'
    ])
            .pipe(debug())
            .pipe(concat('vendor.min.css'))
            .pipe(gulp.dest('src/main/resources/static/styles'));

    //app
    gulp.src("src/site/styles/app/**/*.less")
            .pipe(debug())
            .pipe(less())
            .pipe(cleanCSS())
            .pipe(concat('app.min.css'))
            .pipe(gulp.dest('src/main/resources/static/styles'));
    
    
    //theme
    return gulp.src([
        'src/site/styles/theme/urban.less',
        'src/site/styles/theme/urban.skins.less'
    ])
            .pipe(debug())
            .pipe(less())
            .pipe(cleanCSS())
            .pipe(concat('theme.min.css'))
            .pipe(gulp.dest('src/main/resources/static/styles'));
});




//*****************************************************************
// BUILD OTHER
//*****************************************************************
gulp.task('build-other', function () {
    //images
    gulp.src('src/site/images/**/*.*')
            .pipe(debug())
            .pipe(gulp.dest('src/main/resources/static/images'));

    //web fonts
    return gulp.src([
        'bower_components/bootstrap/dist/fonts/*.*',
        'bower_components/font-awesome/fonts/*.*'
    ])
            .pipe(debug())
            .pipe(gulp.dest('src/main/resources/static/fonts'));
});






gulp.task('build', ['build-html', 'build-js', 'build-css', 'build-other']);

gulp.task('serve', ['build', 'watch'], function () {
    browserSync.init({
        server: {
            baseDir: 'src/main/resources/static'
        }
    });
});

gulp.task('serve-html', ['build-html'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve-js', ['build-js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve-css', ['build-css'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('watch', function () {
    gulp.watch('src/site/**/*.html', ['serve-html']);
    gulp.watch('src/site/**/*.js', ['serve-js']);
    gulp.watch(['src/site/**/*.css', 'src/site/**/*.scss'], ['serve-css']);
});

gulp.task('clean', function () {
    gulp.src('src/main/resources/static', {read: false})
            .pipe(clean({force: true}));
});

gulp.task('default', ['build']);