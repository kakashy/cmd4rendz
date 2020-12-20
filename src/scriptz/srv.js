let spawn = require("child_process").spawn;

let bat = spawn("cmd.exe",
    [
        "/c",
        "../shellz/srv.bat",

    ]

);
bat.stdout.on("data", (data) => {
    console.log(data);
})
bat.stderr.on("data", (err) => {
    console.log(err);
})
bat.on("exit", (code) => {
    console.log(code);
})