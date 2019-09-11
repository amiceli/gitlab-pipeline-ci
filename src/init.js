const signale = require('signale')
const minimist = require('minimist')

module.exports = (args) => {
    const argv = minimist(args)

    if (!argv.project) {
        signale.fatal('No project option provided')
        process.exit(-1)
    }

    return { project : argv.project, limit : argv.limit || 5 }
}
