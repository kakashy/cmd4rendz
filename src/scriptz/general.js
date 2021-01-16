

function noNeed() {
    //check for existing path to blender executable(f.path)
    var fpath = localStorage.getItem("filepath");
    var bndrName = path.basename(fpath);

    if (bndrName == "blender.exe") {
        //Advise user that a path already exists
        document.getElementById("explain").innerHTML = "You already have a blender.exe path saved. You can skip this part.";
        document.getElementById("blender-hold").innerHTML = "If you wish to use a different version of Blender, drop the application file here.";
    } else {
    }
}


var blendReset = document.getElementById("blend-reset");

// clear .blend file path by removing it from session storage
blendReset.addEventListener("click", function(){
    sessionStorage.removeItem("blendPath");
    // confirm reset
    document.getElementById("blend-hold").style.background = "#dee1ec";
    document.getElementById("blend-hold").style.color = "#364f6b";
    document.getElementById("blend-hold").innerHTML = "Cleared. Drop a .blend file.";
});

