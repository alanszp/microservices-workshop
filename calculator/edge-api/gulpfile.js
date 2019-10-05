let gulp = require("gulp");
let clean = require("gulp-clean");
let sequence = require("run-sequence");

gulp.task("copy-config", () =>
  gulp.src("src/config/**/*.json").pipe(gulp.dest("dist/config/"))
);

gulp.task("copy-schemas", () =>
  gulp.src("src/schemas/**/*.json").pipe(gulp.dest("dist/schemas/"))
);

gulp.task("cleanup", () =>
  gulp.src("dist", { read: false, allowEmpty: true }).pipe(clean())
);

gulp.task(
  "copy-files",
  gulp.series("cleanup", "copy-config", "copy-schemas", function(done) {
    done();
  })
);
