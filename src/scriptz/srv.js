let spawn = require("child_process").spawn;
var fs = require('fs');
var irenderer = document.getElementById("img-renderBtn");
var arenderer = document.getElementById("anim-renderBtn");

irenderer.addEventListener("click", function(){

        
        let comanda = "blender -b " + sessionStorage.getItem("blendPath") + " -f " + sessionStorage.getItem("iFrame") +" > render-info.txt";
        let bat = spawn(comanda, {
            shell: true
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

// animation trigger
arenderer.addEventListener("click", function(){

        
    let comanda = "blender -b " + sessionStorage.getItem("blendPath") + " -s " + sessionStorage.getItem("sFrame") + " -e " + sessionStorage.getItem("eFrame") + " -a > render-info.txt";
    let bat = spawn(comanda, {
        shell: true
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

