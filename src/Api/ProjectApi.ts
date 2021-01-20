import GitlabApi from './GitlabApi.ts'
import Config from '../Config/Config.ts'
import Project from '../Model/Project.ts'

class ProjectApi extends GitlabApi {

    public static fromConfig (config : Config) {
        return new ProjectApi(config)
    }

    public async loadProject () : Promise<Project> {
        const url = this.getUrlWithToken(this.projectUrl)
        const response = await fetch(url)
        const json = await response.json()

        return Project.createFromApiResponse(json)
    }

    private get projectUrl () : string {
        return `${this.config.url}/api/v4/projects/${this.config.project}`
    }
}

export default ProjectApi