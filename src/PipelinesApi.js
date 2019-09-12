const axios = require('axios')

class PipelinesApi {

    constructor (projectId, token, url) {
        this.token = token
        this.url = url
        this.projectId = projectId
    }

    async loadLast (limit) {
        const response = await axios.get(this.pipelinesUrl, this.authOptions)
        const pipelines = response.data
        const selected = pipelines.slice(0, limit)

        const pipelinesPromises = []

        selected.forEach((pipeline) => {
            pipelinesPromises.push(this.loadPipeline(pipeline))
        })

        const promisesResponses = await Promise.all(pipelinesPromises)

        return promisesResponses.map((resp) => resp.data)
    }

    async loadPipeline (pipeline) {
        return axios.get(this.getPipelineUrl(pipeline.id), this.authOptions)
    }

    get pipelinesUrl () {
        return `${this.url}/api/v4/projects/${this.projectId}/pipelines`
    }

    getPipelineUrl (id) {
        return `${this.url}/api/v4/projects/${this.projectId}/pipelines/${id}`
    }

    get authOptions () {
        return {
            params : { private_token : this.token },
        }
    }

}

module.exports = PipelinesApi
