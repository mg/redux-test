// npm install --save-dev gulp mocha gulp-mocha chai chai-immutable babel babel-core gulp-babel gulp-watch eslint gulp-eslint jsdom run-sequence
import gulp from 'gulp'
import watch from 'gulp-watch'
import runSequence from 'run-sequence'
import mocha from 'gulp-mocha'
import eslint from 'gulp-eslint'

let conf= {}

// for the server
gulp.task('conf-server', () => {
  conf.src= ['../server/**/*.js', '../server/**/*.jsx']
  conf.test= ['../server/**/*.spec.js', '../server/**/*.spec.jsx']
  conf.testRequire= ['./mocha-server.js']
})

gulp.task('test-server', () => {
  runSequence('conf-server', 'mocha')
})

gulp.task('test-server-watch', () => {
  runSequence('conf-server', 'watch')
})

gulp.task('lint-server', () => {
  runSequence('conf-server', 'eslint')
})

// for the client
gulp.task('conf-client', () => {
  conf.src= ['../client/**/*.js', '../client/**/*.jsx']
  conf.test= ['../client/**/*.spec.js', '../client/**/*.spec.jsx']
  conf.testRequire= ['./mocha-client.js']
})

gulp.task('test-client', () => {
  runSequence('conf-client', 'mocha')
})

gulp.task('test-client-watch', () => {
  runSequence('conf-client', 'watch')
})

gulp.task('lint-client', () => {
  runSequence('conf-client', 'eslint')
})

// tasks
gulp.task('watch', () => {
  watch(conf.src, () => {
    runSequence('mocha')
  })
})

gulp.task('eslint', () => {
  return gulp.src(conf.src, {
    read: false
  })
  .pipe(eslint({
    useEslintrc: true,
  }))
  .pipe(eslint.format())
})

gulp.task('mocha', () => {
  return gulp.src(conf.test, {
    read: false
  })
  .pipe(mocha({
    reporter: 'spec',
    require: conf.testRequire,
  }))
})
