var path = require('path');

//blender file path handling
let blenderPath = document.getElementById("blender-hold");
blenderPath.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();

  for (const f of e.dataTransfer.files) {    
     //check for executable & file name
     var bndrExt = path.extname(f.path);
     var bndrName = path.basename(f.path);

     if (bndrExt != ".exe") {
       //advise user to use an executable file
       document.getElementById("blender-hold").style.background = "#d72323";
       document.getElementById("blender-hold").style.color = "grey";
       document.getElementById("blender-hold").innerHTML = "Please use an executable file.";
       localStorage.removeItem("filepath");
     } else if (bndrName == "blender.exe") {
      // Saving file's path to local storage
      localStorage.setItem("filePath", f.path);
          //Retrieving file's path
          document.getElementById("filePath").innerHTML = localStorage.getItem("filePath");
          //confirm to user that it's authentic
          document.getElementById("blender-hold").style.background = "#17b978";
          document.getElementById("blender-hold").style.color = "black";
          document.getElementById("blender-hold").innerHTML = "Done!";
       } else {
        //advise user to user a blender executable
        document.getElementById("blender-hold").style.background = "#d72323";
        document.getElementById("blender-hold").style.color = "white";
        document.getElementById("blender-hold").innerHTML = "Please drop a 'blender' application file";
        localStorage.removeItem("filepath");
       } 
  }
});
document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});
//Retrieving file's path
document.getElementById("filePath").innerHTML = localStorage.getItem("filePath");

//blend file handling
let blendPath = document.getElementById("blend-hold");
blendPath.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();

  for (const g of e.dataTransfer.files) {
    // Saving to session storage
    sessionStorage.setItem("blendPath", g.path);

    //check the file extension
    var bndExt = path.extname(g.path);
    if (bndExt == ".blend") {
      // Confirm delivery
      document.getElementById("blend-hold").style.background = "#17b978";
      document.getElementById("blend-hold").style.color = "#364f6b";
      document.getElementById("blend-hold").innerHTML = "Done!";
    } else {
      document.getElementById("blend-hold").style.background = "#d72323";
      document.getElementById("blend-hold").style.color = "#364f6b";
      document.getElementById("blend-hold").innerHTML = "Wrong file type. Try again.";
    }
    
  }
})