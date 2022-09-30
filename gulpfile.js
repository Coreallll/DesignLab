const {src, dest, series, watch} = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('sass');
const gulpSass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const webp = require('gulp-webp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const mainSass = gulpSass(sass);
const del = require('del');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

let isProd = false; // dev by default

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist/resources'))
}

const images = () => {
  return src([
      'src/img/**/*.jpg',
      'src/img/**/*.png',
      'src/img/*.svg',
      'src/img/**/*.jpeg'
    ])
    .pipe(gulpif(isProd, image([
      image.mozjpeg({
        quality: 80,
        progressive: true
      }),
      image.optipng({
        optimizationLevel: 2
      }),
    ])))
    .pipe(dest('dist/img'))
};

const webpImages = () => {
  return src(['src/img/**/**.{jpg,jpeg,png}'])
    .pipe(webp())
    .pipe(dest('dist/img'))
};

const htmlInclude = () => {
  return src(['src/*.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const styles = () => {
  return src('src/scss/**/*.scss', {
      sourcemaps: !isProd
    })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(mainSass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(dest('dist/css', {
      sourcemaps: '.'
    }))
    .pipe(browserSync.stream());
};

const scripts = () => {
  src('src/js/vendor/**.js')
		.pipe(concat('vendor.js'))
		.pipe(dest('dist/js/'))
  return src([
    'src/js/scripts.js',
    'src/js/components/**.js'
    ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('scripts.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest('dist/img'));
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/scss/**/*.scss', styles);
watch('src/**/*.js', scripts);
watch('src/partials/*.html', htmlInclude);
watch('src/*.html', htmlInclude);
watch('src/resources/**', resources);
watch('src/img/**.{jpg,jpeg,png,svg}', images);
watch('src/img/**/**/**.{jpg,jpeg,png}', webpImages);
watch('src/img/svg/**/*.svg', svgSprites);

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'));
}

const toProd = (done) => {
  isProd = true;
  done();
};


exports.default = series(clean, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites, watchFiles);
exports.build = series(toProd, clean, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites, htmlMinify);