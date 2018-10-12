const gulp = require('gulp')
const sass = require('gulp-sass')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const sasslint = require('gulp-sass-lint')

gulp.task('styles', () => {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('html', () => {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('eslint', () => {
  gulp.src(['./src/js/**/*.js'])
    .pipe(eslint({
      configFilea: './.eslintrc.yml'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('sasslint', () => {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
})

gulp.task('serve', () =>
  connect.server({
    root: './dist/',
    livereload: true
  })
)
