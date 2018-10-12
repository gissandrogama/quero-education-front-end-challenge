const gulp = require('gulp')
const connect = require('gulp-connect')
const sass = require('gulp-sass')
const eslint = require('gulp-eslint')
const sasslint = require('gulp-sass-lint')
const imagemin = require('gulp-imagemin')

gulp.task('sass', () => {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload())
})

gulp.task('html', () => {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload())
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
    .pipe(sasslint({
      configFile: './.sasslint.yml'
    }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
})

gulp.task('imagemin', () => {
  gulp.src('./src/assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/images'))
})


gulp.task('svg', () => {
  gulp.src('./src/assets/svgs/*')
    .pipe(gulp.dest('./dist/assets/svgs'))
})

gulp.task('serve', () =>
  connect.server({
    root: './dist',
    livereload: true
  })
)

gulp.task('watch', () => {
  gulp.watch('./src/sass/**/*.scss', ['sasslint', 'sass'])
  gulp.watch('./src/index.html', ['html'])
})

gulp.task('build', ['html', 'sasslint', 'sass', 'imagemin', 'svg'])

gulp.task('dev', ['build', 'watch', 'serve'])
