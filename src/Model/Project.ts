class Project {

    public readonly name : string

    public readonly url : string

    public readonly id : number

    private constructor (id : number, name : string, url : string) {
        this.id = id
        this.name = name
        this.url = url
    }

    public static createFromApiResponse (response : any) : Project {
        const { id, name, web_url} = response

        return new Project(id, name, web_url)
    }

}

export default Project
