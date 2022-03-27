import { baseService } from "./baseService";

export class ProjectService extends baseService {

    deleteProject = (id) => {
        return this.Delete(`Project/deleteProject?projectId=${id}`)
    }

    getDetailProject = (id) => {
        return this.Get(`Project/getProjectDetail?id=${id}`)
    }
    
    getAllproject = ()=>{
        return this.Get(`Project/getAllProject`)
    }
}

export const projectService = new ProjectService()