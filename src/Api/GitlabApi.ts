import Config from '../Config/Config.ts'

abstract class GitlabApi {

    protected config : Readonly<Config>

    protected constructor (config : Config) {
        this.config = config
    }

    public async loadFromApi (url : string) : Promise<any> {
        const response = await fetch(url)
        const json = await response.json()

        return json
    }

    protected getUrlWithToken (url : string) {
        return `${url}?private_token=${this.config.token}`
    }

}

export default GitlabApi
