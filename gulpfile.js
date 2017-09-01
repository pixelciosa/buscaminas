var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var babel = require('babelify');
var watchify = require('watchify');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');


function compile(watch) {
	var bundle = browserify('index.js', {debug: true});

	if (watch) {
		bundle = watchify(bundle);
		bundle.on('update', function(){
			console.log('-> bundling...');
			rebundle();
		})
	}

	function rebundle() {
		bundle
			.transform(babel, {presets: ['es2015']})
			.bundle()
			.on('error', function(err){ console.log(err); this.emit('end') })
			.pipe(source('index.js'))
			.pipe(rename('app.js'))
			.pipe(gulp.dest('public'));
	}


	rebundle();
}



gulp.task('build', function(){
	return compile();
});

gulp.task('watch', function(){
	return compile(true);
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['public/*.html'], reload);
});