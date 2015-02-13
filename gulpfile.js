var gulp = require('gulp');
var browserSync = require ('browser-sync');
var bower = require ('gulp-bower');
var sass = require ('gulp-sass');
var modRewrite  = require('connect-modrewrite');
var middleware = require('middleware');
var templateCache = require('gulp-angular-templatecache');

gulp.task('views', function(){
	gulp.src('./build/views/**/*.html')
	.pipe(gulp.dest('./public/src/views/'));
});

gulp.task('home', ['views'], function(){
	gulp.src('./build/html/index.html')
		.pipe(gulp.dest('./public/'));
});

gulp.task('img', ['home'], function(){
	gulp.src('./build/img/**')
		.pipe(gulp.dest('./public/src/img'));
});

gulp.task('scripts', ['img'], function(){
	gulp.src('./build/js/**/*.js')
		.pipe(gulp.dest('./public/src/js/'));
});

gulp.task('build', ['scripts'], function(){
	gulp.src('./build/scss/*scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/src/css/'));
});


//move bower componants to the library folder
gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest('./public/src/js/lib'));
});


//watch these files and run the build if they update
gulp.task('watch', function(){
    gulp.watch(
        ['./build/html/*.html', './build/js/*.js', './build/scss/*.scss','./build/views/*.html','./bower_components'],
        ['build']
    )
});


gulp.task('serve', function () {
		var files = [
		'./public/**/*.html',
		'./public/src/js*.js',
		'./public/src/**/*.js',
		'./public/src/css/*.css',
		'./public/src/views*.html'
	];

    browserSync.init(files, {
        server: {
            baseDir: './public',
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });

   // watch only for app specific codes;
});

gulp.task('default', ['build', 'bower', 'watch', 'serve']);



// // watch these files and update browser when they change
// gulp.task('sync', function(){
// 	var files = [
// 		'app/**/*.html',
// 		'app/src/js*.js',
// 		'app/src/**/*.js',
// 		'app/src/css/*.css',
// 		'app/src/templates*.html'
// 	];

// 	browserSync.init(files, {
// 		server:{
// 			baseDir: './app'
// 		}
// 	});
// });

// gulp.task('browser-sync', function() {
//     browserSync({
//         server: {
//             baseDir: "./app/"
//         }
//     });
// });

