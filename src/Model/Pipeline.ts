class Pipeline {

    public readonly id: number

    public readonly status: string

    public readonly ref: string

    public readonly username: string

    public readonly duration: number | null

    private constructor(id: number, status: string, ref: string, username: string, duration : number | null) {
        this.id = id
        this.status = status
        this.ref = ref
        this.username = username
        this.duration = duration
    }

    public static fromApiResponse(response: any) {
        const { id, status, ref, user, duration } = response
        const { name } = user

        return new Pipeline(id, status, ref, name, duration)
    }

}

export default Pipeline