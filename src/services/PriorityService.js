import { baseService } from "./baseService";

class PriorityService extends baseService {

    getAllPriority = () => {
        return this.Get(`Priority/getAll`)
    }
    
}

export const priorityService = new PriorityService()