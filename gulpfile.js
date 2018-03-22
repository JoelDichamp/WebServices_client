var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var path = "./";

gulp.task("serve", function(){

    browserSync.init({
        server: "./" + path + "/dist"
    });

    //Recharge le navigateur quand dist est mis à jour
    gulp.watch( "./" + path + "/dist/**.*" ).on("change", browserSync.reload);

});