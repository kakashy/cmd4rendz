var path = require('path');
var fs = require('fs');
const { ipcRenderer} = require('electron');

/* Running multiple windows results in multiple localStorages with the nth one being empty. In addition,
updating the app results in an empty localStorage. To solve for both cases, blender.exe path is stored
on a file on the main process and retrieved by the rendered process */
// fetch blender.exe path stored in file
 var documents = app.getPath("documents");
 fs.readFile(path.join(documents, "CMD4Rendz","path.dat"), (err,data) => {
   if (err) {
     alert(err);
   }
   localStorage.setItem("filePath", data);
   //Retrieving file's path
   document.getElementById("filePath").innerHTML = localStorage.getItem("filePath");
 });
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
       document.getElementById("blender-hold").style.color = "white";
       document.getElementById("blender-hold").innerHTML = "Please use an executable file.";
       // localStorage.removeItem("filepath");
     } else if (bndrName == "blender.exe") {
      // Saving file's path to local storage
      localStorage.setItem("filePath", f.path);
      ipcRenderer.send('async-blender', localStorage.getItem("filePath"));

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
        // localStorage.removeItem("filepath");
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
      document.getElementById("blend-hold").style.color = "#fff";
      document.getElementById("blend-hold").innerHTML = "Done! <br /> " + g.path;

      
    } else {
      document.getElementById("blend-hold").style.background = "#d72323";
      document.getElementById("blend-hold").style.color = "#fff";
      document.getElementById("blend-hold").innerHTML = "Wrong file type. Try again.";
    }
    
  }
});
// fetch an image frame for a single render
var iFrame = document.getElementById("imgFrame");
iFrame.addEventListener("change", function(){
    var ifr = document.getElementById("imgFrame").value;
    sessionStorage.setItem("iFrame", ifr);
});
// fetch the starting frame
var iFrame = document.getElementById("startFrame");
iFrame.addEventListener("change", function(){
    var sfr = document.getElementById("startFrame").value;
    sessionStorage.setItem("sFrame", sfr);
});
// fetch the ending frame
var iFrame = document.getElementById("endFrame");
iFrame.addEventListener("change", function(){
    var efr = document.getElementById("endFrame").value;
    sessionStorage.setItem("eFrame", efr);
});