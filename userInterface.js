
const fileSystem = require('./fileSystem')
const search = require('./search')
const path = require('path')

function displayFolderPath(folderPath) {
    document.getElementById('current-folder')
        .innerHTML = convertFolderPathIntoLinks(folderPath)
    bindCurrentFolderPath()
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
    fileDiv.querySelector('img').setAttribute('data-filePath', file.path)

    if (file.type == 'directory') {
        fileDiv.querySelector('img')
            .addEventListener('click', () => {
                loadDirectory(file.path)
            }, false)
    } else {
        fileDiv.querySelector('img')
            .addEventListener('click', () => {
                // debugger
                fileSystem.openFile(file.path)
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
    search.resetIndex(files)
}

function bindSearchField(cb) {
    document.getElementById('search').addEventListener('keyup', cb, false)
}

function filterResults(results) {
    const validFilePaths = results.map(result => result.ref)
    const items = document.getElementsByClassName('item')
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let filePath = item.getElementsByTagName('img')[0]
            .getAttribute('data-filePath')
        if (validFilePaths.indexOf(filePath) !== -1) {
            item.style = null
        } else {
            item.style = 'display:none'
        }
    }
}

function resetFilter() {
    const items = document.getElementsByClassName('item')
    for (let i = 0; i < items.length; i++) {
        items[i].style = null
    }
}

function convertFolderPathIntoLinks(folderPath) {
    const folders = folderPath.split(path.sep)
    const contents = []
    let pathAtFolder = ''
    folders.forEach((folder) => {
        pathAtFolder += folder + path.sep
        contents.push(`
            <span class="path" data-path=${pathAtFolder.slice(0, -1)}>
                ${folder}
            </span>
        `)
    })
    return contents.join('/')
}

function bindCurrentFolderPath() {
    const load = (event) => {
        const folderPath = event.target.getAttribute('data-path')
        loadDirectory(folderPath)
    }
    const paths = document.getElementsByClassName('path')
    for (let i = 0; i < paths.length; i++) {
        paths[i].addEventListener('click', load, false)
    }
}

module.exports = {
    displayFiles,
    loadDirectory,
    bindSearchField,
    filterResults,
    resetFilter
}