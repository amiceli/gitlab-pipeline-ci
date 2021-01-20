import GitlabApi from './GitlabApi.ts'
import Config from '../Config/Config.ts'
import Project from '../Model/Project.ts'
import Pipeline from '../Model/Pipeline.ts'

class PipelineApi extends GitlabApi {

    private project: Project | null = null

    public static fromConfig(config: Config): PipelineApi {
        return new PipelineApi(config)
    }

    public withProject(project: Project) {
        this.project = project

        return this
    }

    public async loadPipelines() {
        if (!this.project) {
            throw new Error('project is undefined')
        }

        const url = this.getUrlWithToken(this.pipelinesUrl)
        const json: any[] = await this.loadFromApi(url)
        const promises = json.slice(0, this.config.limit).map(async ({ id }: { id: number }) => {
            return await this.loadPipeline(id)
        })

        return await Promise.all(promises)
    }

    private async loadPipeline(id: number) {
        const url = this.getUrlWithToken(this.getPipelineUrl(id))
        const json: any = await this.loadFromApi(url)

        return Pipeline.fromApiResponse(json)
    }

    private get pipelinesUrl() {
        return `${this.config.url}/api/v4/projects/${this.project!.id}/pipelines`
    }

    private getPipelineUrl(id: number) {
        return `${this.config.url}/api/v4/projects/${this.project!.id}/pipelines/${id}`
    }

}

export default PipelineApi