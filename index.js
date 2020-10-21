#!/usr/bin/env node

const axios = require('axios')
const readline = require('readline')
const signale = require('./src/Signale.js')
const PipelinesApi = require('./src/PipelinesApi')
const Display = require('./src/Display')

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

const {
    project, limit, token, url,
} = require('./src/init')(process.argv.slice(2))

process.stdin.on('keypress', (str, key) => {
    console.log(key.name)
    if (key.name === 'q') {
        process.exit()
    }
})

const run = async () => {
    try {
        const api = new PipelinesApi(project, token, url)
        const { pipelines, repository } = await api.loadLast(limit)

        process.stdout.write('\x1Bc')

        const webUrl = pipelines[0].web_url.split('pipeline')[0]

        console.log(`Repository ${repository.name}`)
        console.log(`Url        ${webUrl}`)
        console.log('')

        pipelines.forEach((pipeline) => {
            Display.showPipelines(pipeline)
        })

        console.log('')
        console.log('Press q key to exit...')

        setTimeout(run, 5000)
    } catch (e) {
        signale.fatal(e)
        setTimeout(run, 2000)
    }
}

run()
