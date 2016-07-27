var gulp = require('gulp')
var postcss = require('gulp-postcss')
var browserSync = require('browser-sync').create()
var autoprefixer = require('autoprefixer')
var cssnested = require('postcss-nested')

// Server dev
gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: './dist' //sirviendo ficheros
		}
	})
})

// Process css
gulp.task('css', function () {

	var processors = [ 
		autoprefixer( { browsers: ['> 5%', 'ie 8'] } ), // soporte a navegadores que tengan mas del 5% de uso e ie desde el 8
		cssnested
	]

	return gulp
		.src('./src/*.css')
		.pipe(postcss(processors)) //pasamos el plugin postcss que se le pasa un array de plugings de postcss a utilizar
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream()) // refrescar navegador
})


// Watch changes
gulp.task('watch', function() {
	gulp.watch('./src/*.css', ['css'])
	gulp.watch('./dist/*.html').on('change', browserSync.reload)  // ejecuta function cada vez que escuche cambios
})

gulp.task('default', ['watch', 'serve'])