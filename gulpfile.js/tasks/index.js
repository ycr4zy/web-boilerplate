const { task, series, parallel, watch, src, dest } = require('gulp')
var changedInPlace = require("gulp-changed-in-place")
var pipeline = require("readable-stream").pipeline
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var minifyHTML = require("gulp-minify-html");
var browserSync = require("browser-sync");
var cleanCSS = require('gulp-clean-css');
var changed = require("gulp-changed");
var htmlmin = require('gulp-htmlmin')
var uglify = require("gulp-uglify")
var babel = require("gulp-babel")
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var path = require("path");

const baseDir = {
	html: "./src/html/*.html",
	fonts: "./src/fonts/**/*",
	assets: "./src/assets/**/*",
	sounds: "./src/sounds/**/*",
	scripts: "./src/scripts/**/*.js",
	styles: "./src/styles/**/*.scss"
}
const entry = './src'
const outputDir = './dist'
const outputDirCss = './dist/styles'

task("clean", function(cb) {
	del('./dist', {force:true}).then(function (paths) {
		cb();
	});
});

task("fonts", function(cb) {
  return src(baseDir.fonts, { base: entry })
    .pipe(dest(outputDir))
    .pipe(browserSync.stream());
});

task("assets", function(cb) {
  return src(baseDir.assets, { base: entry })
    .pipe(dest(outputDir))
    .pipe(browserSync.stream());
});

task("sounds", function(cb) {
  return src(baseDir.sounds, { base: entry })
    .pipe(dest(outputDir))
    .pipe(browserSync.stream());
});

task("styles", function(cb) {
  return src(baseDir.styles)
  	.pipe(sass()).on('error', handleErrors)
  	.pipe(autoprefixer())
  	.pipe(cleanCSS({ inline: ['none'] }))
  	.pipe(dest(outputDirCss))
  	.pipe(browserSync.stream());
});

task("html", function() {
  var opts = { comments: false, spare: true };
  const options = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true 
  }
  return src(baseDir.html, { base: entry })
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(htmlmin(options))
    .pipe(dest(outputDir))
    .pipe(browserSync.stream());
	
});


task("watch", function() {
  return new Promise((resolve, reject) => {
    watch([baseDir.html], task("html"))
    watch([baseDir.scripts], task("scripts"))
    watch([baseDir.assets], task("assets"))
    watch([baseDir.styles], task("styles"))
    watch([baseDir.sounds], task("sounds"))
    watch([baseDir.fonts], task("fonts"))
    resolve()
  })
});