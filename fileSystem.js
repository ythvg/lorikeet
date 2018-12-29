
const fs = require('fs')
const path = require('path')
const osenv = require('osenv')
const async = require('async')
const shell = require('electron').shell

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

function inspectAndDescribeFiles(folderPath, files, displayFilesCb) {
    async.map(files, (file, asyncCb) => {
        let resolvedFilePath = path.resolve(folderPath, file)
        inspectAndDescribeFile(resolvedFilePath, asyncCb)
    }, displayFilesCb)
}

function openFile (filePath) {
    shell.openItem(filePath)
}

module.exports = {
    getUsersHomeFolder,
    getFilesInFolder,
    inspectAndDescribeFiles,
    openFile
}