if (process.env.NODE_ENV) {
    module.exports = require('./lib/tree.js')
} else {
    module.exports = require('./lib/tree.prod.js')
}