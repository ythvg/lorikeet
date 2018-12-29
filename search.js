const lunr = require('lunr')

let index;

function resetIndex(files) {
    index = lunr(function() {
        this.field('file')
        this.field('type')
        this.ref('path')
        files.forEach(file => {
            this.add(file)
        });
    })
}

function find(query, cb) {
    const results = index.search(query)
    cb(results)
}

module.exports = {
    find,
    resetIndex
}