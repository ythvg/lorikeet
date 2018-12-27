
const fs = require('fs')
const path = require('path')
const osenv = require('osenv')
const async = require('async')

function getUsersHomeFolder() {
    return osenv.home();
}

function getFilesInFolder(folderPath, cb) {
    fs.readdir(folderPath, cb);
}

function inspectAndDescribeFile(filePath, asyncCb) {
    let result = {
        file: path.basename(filePath),
        path: filePath,
        type: ''
    }
    fs.stat(filePath, (err, stat) => {
        if (err) {
            asyncCb(err)
        } else {
            if (stat.isFile) {
                result.type = 'file'
            } 
            if (stat.isDirectory()) {
                result.type = 'directory'
            }
            asyncCb(err, result)
        }
    })
}

function displayFile(file) {
    const mainArea = document.getElementById('main-area')
    const template = document.querySelector('#item-template')
    let fileDiv = document.importNode(template.content, true)
    fileDiv.querySelector('img').src = `images/${file.type}.svg`
    fileDiv.querySelector('.filename').innerText = file.file
    mainArea.appendChild(fileDiv)
}

function displayFiles(err, files) {
    if (err) {
        return alert('Sorry, we could not display your files')
    }
    files.forEach(displayFile)
}

function inspectAndDescribeFiles(folderPath, files, displayFilesCb) {
    async.map(files, (file, asyncCb) => {
        let resolvedFilePath = path.resolve(folderPath, file)
        inspectAndDescribeFile(resolvedFilePath, asyncCb)
    }, displayFilesCb)
}

function main() {
    const folderPath = getUsersHomeFolder();
    getFilesInFolder(folderPath, (err, files) => {
        if (err) {
            return alert('Sorry, we could not load your home folder');
        }
        inspectAndDescribeFiles(folderPath, files, displayFiles)
    })
}

main();