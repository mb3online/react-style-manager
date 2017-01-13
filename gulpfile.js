const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

gulp.task('build', () => {
    const b = babel({ presets: [ 'es2015', 'react' ] });

    return gulp.src('src/*')
        .pipe(b)
        .pipe(gulp.dest('dist'));
});
