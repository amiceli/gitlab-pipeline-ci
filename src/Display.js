const signale = require('signale')

class Display {

    static showPipelines (pipeline) {
        const str = `
            ${pipeline.ref.padEnd(60)} trigger by ${pipeline.user.username}
        `

        this.getDisplayMethod(pipeline)(str.trim())
    }

    static getDisplayMethod (pipeline) {
        switch (pipeline.status) {
            case 'success':
                return signale.success
            case 'pending':
                return signale.pending
            case 'skipped':
                return signale.debug
            case 'canceled':
                return signale.debug
            case 'failed':
                return signale.fatal
            case 'running':
                return signale.watch
            default:
                return signale.success
        }
    }

}

module.exports = Display
