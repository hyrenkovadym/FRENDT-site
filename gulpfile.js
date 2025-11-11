const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");

// 🟢 Server
gulp.task("server", function () {
	browserSync.init({
		server: { baseDir: "dist" },
	});
});

// 🟢 Styles
gulp.task("styles", function () {
	return gulp
		.src("src/sass/**/*.+(scss|sass)")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.stream());
});

// 🟢 HTML
gulp.task("html", function () {
	return gulp
		.src("src/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest("dist"))
		.pipe(browserSync.stream());
});

// 🟢 Scripts
gulp.task("scripts", function () {
	return gulp
		.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(browserSync.stream());
});

// 🟢 Fonts
gulp.task("fonts", function () {
	return gulp
		.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"))
		.pipe(browserSync.stream());
});

// 🟢 Icons
gulp.task("icons", function () {
	return gulp
		.src("src/icons/**/*")
		.pipe(gulp.dest("dist/icons"))
		.pipe(browserSync.stream());
});

// 🟢 Images
gulp.task("images", function () {
	return gulp
		.src("src/img/**/*")
		.pipe(gulp.dest("dist/img"))
		.pipe(browserSync.stream());
});

// 🟢 Watch
gulp.task("watch", function () {
	gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.series("styles"));
	gulp.watch("src/*.html", gulp.series("html"));
	gulp.watch("src/js/**/*.js", gulp.series("scripts"));
	gulp.watch("src/fonts/**/*", gulp.series("fonts"));
	gulp.watch("src/icons/**/*", gulp.series("icons"));
	gulp.watch("src/img/**/*", gulp.series("images"));
});

// 🟢 Default
gulp.task(
	"default",
	gulp.parallel(
		"styles",
		"html",
		"scripts",
		"fonts",
		"icons",
		"images",
		"watch",
		"server"
	)
);
