
const fileSystem = require('./fileSystem')

function displayFolderPath(folderPath) {
    document.getElementById('current-folder').innerText = folderPath;
}

function clearView() {
    const mainArea = document.getElementById('main-area')
    while (mainArea.firstChild) {
        mainArea.removeChild(mainArea.firstChild)
    }
}

function loadDirectory(folderPath) {
    displayFolderPath(folderPath)
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
        clearView()
        if (err) {
            return alert('Sorry, you could not load your folder')
        }
        fileSystem.inspectAndDescribeFiles(folderPath, files, displayFiles)
    })
}

function displayFile(file) {
    const mainArea = document.getElementById('main-area')
    const template = document.querySelector('#item-template')
    let fileDiv = document.importNode(template.content, true)
    fileDiv.querySelector('img').src = `images/${file.type}.svg`

    if (file.type == 'directory') {
        fileDiv.querySelector('img')
            .addEventListener('dblclick', () => {
                loadDirectory(file.path)
            }, false)
    }
    fileDiv.querySelector('.filename').innerText = file.file
    mainArea.appendChild(fileDiv)
}

function displayFiles(err, files) {
    if (err) {
        return alert('Sorry, we could not display your files')
    }
    files.forEach(displayFile)
}

module.exports = {
    displayFiles,
    loadDirectory
}