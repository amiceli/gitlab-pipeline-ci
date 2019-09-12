const signale = require('signale')
const minimist = require('minimist')

module.exports = (args) => {
    const displayError = (argName) => {
        signale.fatal(`No ${argName} option provided`)
        process.exit(-1)
    }

    const argv = minimist(args)

    if (!argv.project) {
        displayError('project')
    }

    if (!argv.token) {
        displayError('token')
    }

    if (!argv.token) {
        displayError('url')
    }

    return { 
        project : argv.project,
        limit : argv.limit || 5 ,
        url : argv.url,
        token : argv.token
    }
}
