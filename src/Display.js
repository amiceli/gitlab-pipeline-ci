const signale = require('./Signale.js')

class Display {

    static showPipelines (pipeline) {
        let ref

        if (pipeline.ref.length > 20) {
            ref = `${pipeline.ref.slice(0, 17)}...`
        } else {
            ref = pipeline.ref.slice(0, 20).padEnd(20)
        }

        const str = `
            #${pipeline.id} ${ref} trigger by ${pipeline.user.username}
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
                return signale.skipped
            case 'canceled':
                return signale.canceled
            case 'failed':
                return signale.fatal
            case 'running':
                return signale.building
            default:
                return signale.success
        }
    }

}

module.exports = Display
