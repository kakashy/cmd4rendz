var { shell } = require('electron').remote;

var blendReset = document.getElementById("blend-reset");

// clear .blend file path by removing it from session storage
blendReset.addEventListener("click", function(){
    sessionStorage.removeItem("blendPath");
    // confirm reset
    document.getElementById("blend-hold").style.background = "#dee1ec";
    document.getElementById("blend-hold").style.color = "#364f6b";
    document.getElementById("blend-hold").innerHTML = "Cleared. Drop a .blend file.";
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}

//PAGE 2: Open .blend file
var openFile = document.getElementById("open-blend");
openFile.addEventListener("click", () => {
  var openFileCommand = sessionStorage.getItem("blendPath");
  if (openFileCommand == null){

  } else {
    shell.openPath(openFileCommand);
  }
});