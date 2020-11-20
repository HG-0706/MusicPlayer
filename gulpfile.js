const {series,src,dest,watch} = require("gulp")
const uglify = require('gulp-uglify')
const pipeline = require('readable-stream').pipeline
const htmlClean = require("gulp-htmlclean")
const less = require("gulp-less")
const CleanCss = require("gulp-clean-css")
const stripDebug = require("gulp-strip-debug")
// const imageMin = require("gulp-imagemin")
const connect = require("gulp-connect");

var folder = {
    src:"src/",
    dist:"dist/"
}
function html() {
    return pipeline(
        src(folder.src+"html/*"),
        htmlClean(),
        dest(folder.dist+"html/"),
        connect.reload()
    )
}
function css() {
    return pipeline(
        src(folder.src+"css/*"),
        less(),
        CleanCss(),
        dest(folder.dist+"css/"),
        connect.reload()
    )
}
function js() {
    return pipeline(
        src(folder.src+"js/*"),
        // stripDebug(),
        // uglify(),
        dest(folder.dist+"js/"),
        connect.reload()
    )
}
function image() {
    return pipeline(
        src(folder.src+"image/*"),
        // imgMin(),
        dest(folder.dist+"image/")
    )
}
function server(done) {
    connect.server({
        port:"9000",
        livereload:true
    })
    done();
}

watch(folder.src+"html/*",function (done) {
    html();
    done();
})
watch(folder.src+"css/*",function (done) {
    css();
    done();
})
watch(folder.src+"js/*",function (done) {
    js();
    done();
})
exports.default = series(html,css,js,image,server)