import { styles } from "https://deno.land/x/ansi_styles@1.0.0/mod.ts";
import Project from '../Model/Project.ts'
import Pipeline from '../Model/Pipeline.ts'

class Console {

    public project: Project | null = null

    public pipelines: Pipeline[] | null = null

    public static get () : Console {
        return new Console()
    }

    public withProject (project : Project) {
        this.project = project

        return this
    }

    public withPipelines (pipelines : Pipeline[]) {
        this.pipelines = pipelines

        return this
    }

    public display () {
        if (!this.project || !this.pipelines) {
            throw new Error('project or pipelines are empty')
        }

        console.log(`Repository ${this.project.name}`)
        console.log(`URL        ${this.project.url}`)
        console.log('')

        this.pipelines.forEach((p : Pipeline) => {
            const status = this.getStyleStatus(p).padEnd(20, ' ')
            const ref = this.getRef(p)

            console.log(`${status}${p.id} ${ref} ${p.username}`)
        })
    }

    private getRef (p : Pipeline) : string {
        if (p.ref.length > 20) {
            return p.ref.substr(0, 17).padEnd(20, '.')
        } else {
            return p.ref.padEnd(20, ' ')
        }
    }

    private getStyleStatus(p : Pipeline) : string {
        if (p.status === 'success') {
            return `${styles.green.open}✓ success${styles.green.close}`
        }
        if (p.status === 'pending') {
            return `${styles.magenta.open}◻ pending${styles.magenta.close}`
        }
        if (p.status === 'failed') {
            return `${styles.red.open}✖ error${styles.red.close}`
        }
        if (p.status === 'skipped') {
            return `${styles.grey.open}→ skipped${styles.grey.close}`
        }
        if (p.status === 'running') {
            return `${styles.blue.open}▶ running${styles.blue.close}`
        }

        return ''
    }

}

export default Console