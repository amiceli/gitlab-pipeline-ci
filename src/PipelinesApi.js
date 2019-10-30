const axios = require('axios')

class PipelinesApi {

    constructor (projectId, token, url) {
        this.token = token
        this.url = url
        this.projectId = projectId
    }

    async loadLast (limit) {
        const repository = await this.getProjectDetails()
        const response = await axios.get(this.pipelinesUrl, this.authOptions)
        const pipelines = response.data
        const selected = pipelines.slice(0, limit)

        const pipelinesPromises = []

        selected.forEach((pipeline) => {
            pipelinesPromises.push(this.loadPipeline(pipeline))
        })

        const promisesResponses = await Promise.all(pipelinesPromises)

        return {
            repository, pipelines : promisesResponses.map((resp) => resp.data)
        }
    }

    async getProjectDetails () {
        const response = await axios.get(this.projectUrl, this.authOptions)

        return {
            name : response.data.name,
            link : response.data._links.self
        }
    }

    async loadPipeline (pipeline) {
        return axios.get(this.getPipelineUrl(pipeline.id), this.authOptions)
    }

    get projectUrl () {
        return `${this.url}/api/v4/projects/${this.projectId}`
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
