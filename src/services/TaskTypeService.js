import { baseService } from "./baseService";

class TaskTypeService extends baseService {

    getAllTaskType = ()=>{
        return this.Get(`TaskType/getAll`)
    }
    
}

export const taskTypeService = new TaskTypeService()