const {Signale} = require('signale')

const options = {
    types : {
        building : {
            badge : 'ᐅ',
            color : 'cyan',
            label : 'building',
            logLevel : 'info',
        },
        skipped : {
            badge : '-',
            color : 'grey',
            label : 'skipped',
            logLevel : 'info',
        },
        canceled : {
            badge : '-',
            color : 'grey',
            label : 'canceled',
            logLevel : 'info',
        },
        fatal : {
            label : 'failed'
        }
    },
}

const custom = new Signale(options)

module.exports = custom
