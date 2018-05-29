const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const replace = require('gulp-replace');

const buildsDir = 'build';
const analyticsFile = 'analytics.html';
const indexFile = 'index.html';
const analyticsToken = '<link id="analytics">';

gulp.task('add-analytics', function() {
  const base = './';
  fs.readdirSync(buildsDir).filter(f => fs.lstatSync(path.join(buildsDir, f)).isDirectory()).forEach(buildDir => {
    const analyticsContent = fs.readFileSync(path.join(buildsDir, buildDir, analyticsFile));
    gulp.src([ path.join(buildsDir, buildDir, indexFile) ], {
      base,
    }).pipe(replace(analyticsToken, analyticsContent)).pipe(gulp.dest(base));
  });
});
