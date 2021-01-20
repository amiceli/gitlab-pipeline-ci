import Config from './src/Config/Config.ts'
import ProjectApi from './src/Api/ProjectApi.ts'
import PipelineApi from './src/Api/PipelineApi.ts'
import Console from './src/Output/Console.ts'

const exec = async (args : any) => {
    const config = Config.fromObject(args)
    const project = await ProjectApi.fromConfig(config).loadProject()
    const pipelines = await PipelineApi.fromConfig(config).withProject(project).loadPipelines()

    Console.get().withProject(project).withPipelines(pipelines).display()
}

export { exec }