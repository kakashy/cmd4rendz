let spawn = require("child_process").spawn;
var fs = require('fs');
var irenderer = document.getElementById("img-renderBtn");
var arenderer = document.getElementById("anim-renderBtn");

var cyc = document.getElementById("cyc-select");
var eve = document.getElementById("eve-select");
var wkb = document.getElementById("wkb-select");

/* Engine Selection. While it might not be necessary to change engine type,
the option to do so might be necessary where one needs to test different looks */
// Save Engine preferences when link is clicked
cyc.addEventListener("click", function(){
    sessionStorage.setItem("rEngine", "CYCLES");
});
eve.addEventListener("click", function(){
    sessionStorage.setItem("rEngine", "BLENDER_EEVEE");
});
wkb.addEventListener("click", function(){
    sessionStorage.setItem("rEngine", "BLENDER_WORKBENCH");
});

irenderer.addEventListener("click", function(){
        
        let rEngine = sessionStorage.getItem("rEngine");
        let comanda = 'blender -b "' + sessionStorage.getItem("blendPath") + '" -f ' + sessionStorage.getItem("iFrame") + ' -E ' + rEngine + ' > render-info.txt';
        let wd = localStorage.getItem("filePath");
        // safety net for null engine selection until I find a way to properly scrap .blend files
        if(rEngine==null){
            sessionStorage.setItem("rEngine", " CYCLES")
        } else {
            console.log("Engine selected")
        };
        let bat = spawn(comanda, {
            shell: true,
        }
    );

    bat.stdout.on("data", (data) => {
        console.log(data);
    })
    bat.stderr.on("data", (err) => {
        console.log(err);
    })
    bat.on("exit", (code) => {
        console.log(code);
        console.log(wd);

        fs.readFile('./render-info.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(comanda);
            document.getElementById("render-out").innerHTML = data;
        })
        
    })
})

// animation trigger
arenderer.addEventListener("click", function(){

    let rEngine = sessionStorage.getItem("rEngine");        
    let comanda = 'blender.exe -b "' + sessionStorage.getItem("blendPath") + '" -s ' + sessionStorage.getItem("sFrame") + ' -e ' + sessionStorage.getItem("eFrame") + ' -E ' + rEngine + ' -a > render-info.txt';
    let wd = localStorage.getItem("filePath")
    // safety net for null engine selection until I find a way to properly scrap .blend files
    if(rEngine==null){
        sessionStorage.setItem("rEngine", " CYCLES")
    } else {
        console.log("Engine selected")
    };
    let bat = spawn(comanda, {
        shell: true,
    }
);

bat.stdout.on("data", (data) => {
    console.log(data);
})
bat.stderr.on("data", (err) => {
    console.log(err);
})
bat.on("exit", (code) => {
    console.log(code);

    fs.readFile('./render-info.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(data);
        document.getElementById("render-out").innerHTML = data;
    })
    
})
})

