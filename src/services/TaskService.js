import { baseService } from "./baseService";

class TaskService extends baseService {

    createTask = (taskObj)=>{
        return this.Post(`Project/createTask`, taskObj)
    }

    getTaskDetail = (taskID) => {
        return this.Get(`Project/getTaskDetail?taskId=${taskID}`)
    }
    
    updateStatusTask = (taskStatusUpdate) => {
        return this.put(`Project/updateStatus`, taskStatusUpdate)
    }
    
    updateTask = (taskUpdate) => {
        return this.Post(`Project/updateTask`, taskUpdate)
    }
}

export const taskService = new TaskService()