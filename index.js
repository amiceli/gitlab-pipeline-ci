require('dotenv').config()

const axios = require('axios')
const signale = require('signale')
const PipelinesApi = require('./src/PipelinesApi')
const Display = require('./src/Display')

const {project, limit} = require('./src/init')(process.argv.slice(2))

const run = async () => {
    try {
        const api = new PipelinesApi(project)
        const pipelines = await api.loadLast(limit)

        console.log('\033[2J');

        for (let pipeline of pipelines) {
            Display.showPipelines(pipeline)
        }

        setTimeout(run, 5000)
    } catch (e) {
        signale.fatal(e)
    }
}

run()
