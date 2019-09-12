#!/usr/bin/env node

const axios = require('axios')
const signale = require('signale')
const PipelinesApi = require('./src/PipelinesApi')
const Display = require('./src/Display')

const {project, limit, token, url} = require('./src/init')(process.argv.slice(2))

const run = async () => {
    try {
        const api = new PipelinesApi(project, token, url)
        const pipelines = await api.loadLast(limit)

        process.stdout.write('\x1Bc')

        for (let pipeline of pipelines) {
            Display.showPipelines(pipeline)
        }

        setTimeout(run, 5000)
    } catch (e) {
        signale.fatal(e)
    }
}

run()
