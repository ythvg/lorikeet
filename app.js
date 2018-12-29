const fileSystem = require('./fileSystem')
const userInterface = require('./userInterface')
const search = require('./search')

function main() {
    const folderPath = fileSystem.getUsersHomeFolder();
    userInterface.loadDirectory(folderPath)
    userInterface.bindSearchField((event) => {
        const query = event.target.value
        if (query === '') {
            userInterface.resetFilter()
        } else {
            search.find(query, userInterface.filterResults)
        }
    })
}

window.onload = main;