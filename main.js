const path = require('path')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('ready', () => {
    mainWindow = new BrowserWindow()
    console.log(__dirname);
    mainWindow.loadURL(`file://${app.getAppPath()}/index.html`)
    mainWindow.on('closed', () => { mainWindow = null })
})