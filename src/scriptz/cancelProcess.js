const {exec} = require('child_process');
var cancelBlender = document.getElementById("blender-cancelBtn");

cancelBlender.addEventListener("click", () => {
    // Kills a process based on filename of the exe and all child processes
    exec(`taskkill /im blender.exe /t /f`, (err, stdout, stderr) => {
        if (err) {
          throw err
        }

        alert("Blender process has been cancelled");
});
});