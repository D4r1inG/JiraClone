import { baseService } from "./baseService";

class UserService extends baseService {

    signUpUser = (userSignUp) => {
        return this.Post(`Users/signup`, userSignUp)
    }

    getUser = (keyword) => {
        return this.Get(`Users/getUser?keyword=${keyword}`)
    }

    editUser = (userEdit)=>{
        return this.put(`Users/editUser`, userEdit)
    }

    deleteUser = (id) => {
        return this.Delete(`Users/deleteUser?id=${id}`)
    }

    assignUserProject = (userProject)=>{
        return this.Post(`Project/assignUserProject`,userProject)
    }
 
    removeUserFromProject = (userProject) =>{
        return this.Post(`Project/removeUserFromProject`, userProject)
    }

    getUserByProjectId = (projectId)=>{
        return this.Get(`Users/getUserByProjectId?idProject=${projectId}`)
    }
}

export const userService = new UserService()