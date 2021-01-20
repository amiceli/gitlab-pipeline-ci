class Config {

    public readonly url : string
    public readonly token : string
    public readonly project : number
    public readonly limit : number


    private constructor (url : string, token : string, project : number, limit : number = 5) {
        this.url = url
        this.token = token
        this.project = project
        this.limit = limit
    }

    public static fromObject (params : any) {
        const { url, token, project, limit} = params

        return new Config(url, token, project, limit)
    }

}

export default Config