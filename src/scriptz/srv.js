let spawn = require("child_process").spawn;
var fs = require('fs');
var path = require('path');
const { shell } = require('electron');
const logFile = "%userprofile%/Documents/CMD4Rendz/Logs/render-info.txt";
const fBar = document.getElementById("foodbar");
const rOut = document.getElementById("render-out");
const xBar = document.getElementById("snackbar");
const lBtn = document.getElementById("logBtn");

var irenderer = document.getElementById("img-renderBtn");
var arenderer = document.getElementById("anim-renderBtn");

var rEngButton = document.getElementById("eng-drop");
var arEngButton = document.getElementById("a-eng-drop");

var cyc = document.getElementById("cyc-select");
var eve = document.getElementById("eve-select");
var wkb = document.getElementById("wkb-select");

var acyc = document.getElementById("a-cyc-select");
var aeve = document.getElementById("a-eve-select");
var awkb = document.getElementById("a-wkb-select");
/* Engine Selection. While it might not be necessary to change engine type,
the option to do so might be necessary where one needs to test different looks */
// Save Engine preferences when link is clicked
cyc.addEventListener("click", function(){
    sessionStorage.setItem("rEngine", "CYCLES");
    rEngButton.innerHTML = sessionStorage.getItem("rEngine");
});
eve.addEventListener("click", function(){
    sessionStorage.setItem("rEngine", "BLENDER_EEVEE");
    rEngButton.innerHTML = sessionStorage.getItem("rEngine");
});
wkb.addEventListener("click", function(){
    sessionStorage.setItem("rEngine", "BLENDER_WORKBENCH");
    rEngButton.innerHTML = sessionStorage.getItem("rEngine");
});

acyc.addEventListener("click", function(){
    sessionStorage.setItem("arEngine", "CYCLES");
    arEngButton.innerHTML = sessionStorage.getItem("arEngine");
});
aeve.addEventListener("click", function(){
    sessionStorage.setItem("arEngine", "BLENDER_EEVEE");
    arEngButton.innerHTML = sessionStorage.getItem("arEngine");
});
awkb.addEventListener("click", function(){
    sessionStorage.setItem("arEngine", "BLENDER_WORKBENCH");
    arEngButton.innerHTML = sessionStorage.getItem("arEngine");
});

irenderer.addEventListener("click", function(){
        
        let rEngine = sessionStorage.getItem("rEngine");
        let wd = path.dirname(localStorage.getItem("filePath"));
        let comanda = 'c: && cd "' + wd + '" && blender.exe -b "' + sessionStorage.getItem("blendPath") + '" -E ' + rEngine+ ' -f ' + sessionStorage.getItem("iFrame") + ' > %userprofile%/Documents/CMD4Rendz/Logs/render-info.txt';
        // safety net for null engine selection until I find a way to properly scrap .blend files
        if(rEngine==null){
            sessionStorage.setItem("rEngine", " CYCLES")
        } else {
            console.log("Engine selected")
        };
        // Add the "show" class to DIV
        xBar.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ xBar.className = xBar.className.replace("show", ""); }, 3000);
        rOut.innerHTML = "Rendering...";
      let bat = spawn(comanda, {
            shell: true,
        }
    );

    bat.stdout.on("data", (chunk) => {
        console.log(chunk);
    })
    bat.stderr.on("data", (err) => {
        console.log(comanda);
        console.log(err.toString());
        alert(err.toString());
    })
    bat.on("exit", (code) => {
        console.log(code);

        if (code == 0){

            fBar.className = "show";
            lBtn.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function(){ fBar.className = fBar.className.replace("show", ""); }, 3000);
            rOut.innerHTML = "Render Complete";
        } else {
            rOut.innerHTML = "Something went wrong :(";
        };

        // fs.readFile('~/Documents/CMD4Rendz/render-info.txt', 'utf8', (err, data) => {
        //     if (err) {
        //         console.log(err)
        //         return
        //     }
        //     console.log(comanda);
        //     document.getElementById("render-out").innerHTML = data;
        // })
        
    })
});

// animation trigger
arenderer.addEventListener("click", function(){

    let arEngine = sessionStorage.getItem("arEngine");
    let wd = path.dirname(localStorage.getItem("filePath"));
    let comanda = 'c: && cd ' + wd + ' && blender.exe -b "' + sessionStorage.getItem("blendPath") + '" -E ' + arEngine + ' -s ' + sessionStorage.getItem("sFrame") + ' -e ' + sessionStorage.getItem("eFrame") + ' -a > %userprofile%/Documents/CMD4Rendz/Logs/render-info.txt';
    // safety net for null engine selection until I find a way to properly scrap .blend files
    if(arEngine==null){
        sessionStorage.setItem("arEngine", " CYCLES")
    } else {
        console.log("Engine selected");
    };
        // Add the "show" class to DIV
        xBar.className = "show";
        lBtn.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ xBar.className = xBar.className.replace("show", ""); }, 3000);
        rOut.innerHTML = "Rendering...";
    let bat = spawn(comanda, {
        shell: true,
    }
);

bat.stdout.on("data", (data) => {
    console.log(data);
})
bat.stderr.on("data", (err) => {
    console.log(err.toString());
    alert(err.toString());
})
bat.on("exit", (code) => {
    console.log(code);
    if (code == 0){

        fBar.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ fBar.className = fBar.className.replace("show", ""); }, 3000);
        rOut.innerHTML = "Render Complete"
    } else {
        rOut.innerHTML = "Something went wrong :(";
    };

    // fs.readFile('~/Documents/CMD4Rendz/render-info.txt', 'utf8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return
    //     }
    //     console.log(data);
    //     document.getElementById("render-out").innerHTML = data;
    // })
    
})
});

// check logs
lBtn.addEventListener("click", function(){
    shell.showItemInFolder(logFile);
});

