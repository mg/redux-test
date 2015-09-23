// npm install --save-dev gulp mocha gulp-mocha chai chai-immutable babel babel-core gulp-babel gulp-watch eslint gulp-eslint jsdom run-sequence
require("babel/register")({ stage: 0 })

var gulp = require('gulp')
var watch = require('gulp-watch')
var runSequence = require('run-sequence')
var mocha= require('gulp-mocha')
var eslint = require('gulp-eslint')

var conf= {}

// for the server
gulp.task('conf-server', function() {
  conf.src= ['../server/**/*.js', '../server/**/*.jsx']
  conf.test= ['../server/**/*.spec.js', '../server/**/*.spec.jsx']
  conf.testRequire= ['./mocha-server.js']
})

gulp.task('test-server', function() {
  runSequence('conf-server', 'mocha')
})

gulp.task('test-server-watch', function() {
  runSequence('conf-server', 'watch')
})

gulp.task('lint-server', function() {
  runSequence('conf-server', 'eslint')
})

// for the client
gulp.task('conf-client', function() {
  conf.src= ['../client/**/*.js', '../client/**/*.jsx']
  conf.test= ['../client/**/*.spec.js', '../client/**/*.spec.jsx']
  conf.testRequire= ['./mocha-client.js']
})

gulp.task('test-client', function() {
  runSequence('conf-client', 'mocha')
})

gulp.task('test-client-watch', function() {
  runSequence('conf-client', 'watch')
})

gulp.task('lint-client', function() {
  runSequence('conf-client', 'eslint')
})

// tasks
gulp.task('watch', function() {
  watch(conf.src, function() {
    runSequence('mocha')
  })
})

gulp.task('eslint', function() {
  return gulp.src(conf.src, {
    read: false
  })
  .pipe(eslint({
    useEslintrc: true,
  }))
  .pipe(eslint.format())
})

gulp.task('mocha', function() {
  return gulp.src(conf.test, {
    read: false
  })
  .pipe(mocha({
    reporter: 'spec',
    require: conf.testRequire,
  }))
})
