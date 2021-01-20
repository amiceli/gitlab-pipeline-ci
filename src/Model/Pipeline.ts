class Pipeline {

    public readonly id: number

    public readonly status: string

    public readonly ref: string

    public readonly username: string

    private constructor(id: number, status: string, ref: string, username: string) {
        this.id = id
        this.status = status
        this.ref = ref
        this.username = username
    }

    public static fromApiResponse(response: any) {
        const { id, status, ref, user } = response
        const { name } = user

        return new Pipeline(id, status, ref, name)
    }

}

export default Pipeline