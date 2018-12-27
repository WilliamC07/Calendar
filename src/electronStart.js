const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        fullscreen: true
    });

    // Connect to react
    mainWindow.loadURL('http://localhost:3000');

    // Close view
    mainWindow.on('closed', () => mainWindow = null);
}

// Start the application when electron is ready
app.on('ready', createWindow);

// Prevents application from quitting when all windows are closed in MacOS
app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

// Show window again when it is closed on MacOS
app.on('activate', function(){
    if(mainWindow === null){
        createWindow();
    }
});