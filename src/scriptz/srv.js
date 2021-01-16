let spawn = require("child_process").spawn;
var fs = require('fs');
var renderer = document.getElementById("renderBtn");

renderer.addEventListener("click", function(){
    const Notification = electron.remote.Notification;
    const options = {
        title: 'Opa!',
        body: 'Ayeeeee, I"m walking here',
        timeoutType: 'never',
        actions: [{
            type: 'button',
            text: 'Show Button'
        }]
    };
    const customNotification = new Notification(options);
    customNotification.show();
        
        let comanda = "blender -b " + sessionStorage.getItem("blendPath") + " -a > render-info.txt";
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

