var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});


// gulp.task('default', ['styles', 'scripts', 'watch']);
gulp.task('default', ['styles', 'scripts', 'watch']);

gulp.task('styles', function () {
  return gulp
    .src('./sass/**/*.scss')
    .pipe(customPlumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.autoprefixer({browsers: ['last 25 versions']}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
});

gulp.task('scripts', function () {
  // todo should add stuff here...
  console.log('scripts');
});

gulp.task('watch', ['browserSync'], function () {
  gulp.watch('./sass/**/*.scss', ['styles', 'bsReload']);
  gulp.watch('./**/*.js', ['scripts', 'bsReload']);
  gulp.watch('./**/*.html', ['bsReload']);
});

gulp.task('bsReload', function () {
  browserSync.reload();
});

// Set the proxy.
gulp.task('browserSync', function () {

  var options = {
    proxy: 'tetris.dev',
    files: [
      './sass/**/*.css',
      './**/*.js',
      './**/*.html',
    ],
    ghostMode: {
      clicks: true,
      location: true,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    notify: true,
    reloadDelay: 0 //1000
  };

  browserSync.init(null, options);
});

function customPlumber() {
  return $.plumber({
    errorHandler: function (err) {
      console.log(err.stack);
      this.emit('end');
    }
  })
}