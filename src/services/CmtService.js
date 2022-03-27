import { baseService } from "./baseService";

class CmtService extends baseService {

    postCmt = (cmtContent)=>{
        return this.Post(`Comment/insertComment`, cmtContent)
    }

    updateCmt = (id, cmtContent) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${cmtContent}`)
    }
    
    deleteCmt = (id) => {
        return this.Delete(`Comment/deleteComment?idComment=${id}`)
    }
}

export const cmtService = new CmtService()