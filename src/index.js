const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');


var home = require("os").homedir();
var renderLog = home + '\\Documents\\CMD4Rendz\\Logs';
var pathFile = path.join(home, '\\Documents\\CMD4Rendz\\path.dat');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'resources/media/cmd4rndz.ico'),
    backgroundColor: '#d36729',
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
  },
    width: 600,
    height: 600,
    minWidth: 400,
    minHeight: 500,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

   Menu.setApplicationMenu(null);

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('ready', () => {
  if (!fs.existsSync(renderLog)){
    fs.mkdirSync(renderLog, {recursive: true});
  }
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
  ipcMain.on('async-blender', (event, arg) => {
    var pathInfo = arg;
  // if (!fs.existsSync(pathFile)){
  //   fs.mkdirSync(pathFile, {recursive: true});
  // }
  fs.writeFile(pathFile, pathInfo, function(err){
    if (err) throw err;
  });
  });


