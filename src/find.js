const {dialog} = require('electron').remote;
const blend = document.getElementById(blendbtn);

if(blend){
    document.getElementById(blendbtn).addEventListener('click', function(event){
        dialog.showOpenDialog(mainWindow, {
            properties: ['openFile', 'openDirectory']
          }).then(result => {
            console.log(result.canceled)
            console.log(result.filePaths)
          }).catch(err => {
            console.log(err)
          })
    })
}
