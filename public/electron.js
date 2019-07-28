const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

let mainWindow;
const inDevMode = true;

function createWindow(){
    if(inDevMode){
        const os = require('os');
        BrowserWindow.addDevToolsExtension(
            path.join('/Users/williamcao/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0')
        );
    }

    mainWindow = new BrowserWindow({
        fullscreen: true
    });

    // Connect to react
    if(inDevMode){
        mainWindow.loadURL('http://localhost:3000');
    }else{
        mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    }

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