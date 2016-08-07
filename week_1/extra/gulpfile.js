'use strict';

const gulp = require('gulp'),
    ts = require('gulp-typescript');

const REACT_DEPENDENCIES =[
    'node_modules/react/dist/react.js',
    'node_modules/react-dom/dist/react-dom.js'
];

gulp.task('build', () => {
    return gulp.src('app/**/*.ts')
        .pipe(ts({
            jsx: 'react',
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('built'));
});

gulp.task('dependencies:react', () => {
    return gulp.src(REACT_DEPENDENCIES)
        .pipe(gulp.dest('built'));
});

gulp.task('watch', () => {
    gulp.watch(['app/**/*.ts'], ['build']);
});

gulp.task('default', ['build', 'dependencies:react', 'watch']);