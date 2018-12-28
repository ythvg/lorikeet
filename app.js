const fileSystem = require('./fileSystem')
const userInterface = require('./userInterface')

function main() {
    const folderPath = fileSystem.getUsersHomeFolder();
    userInterface.loadDirectory(folderPath)
}

window.onload = main;