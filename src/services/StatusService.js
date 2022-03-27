import { baseService } from "./baseService";

class StatusService extends baseService {

    getAllStatus = ()=>{
        return this.Get(`Status/getAll`)
    }
    
}

export const statusService = new StatusService()