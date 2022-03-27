import  Axios  from "axios"
import { DOMAIN_JIRAAPP, TOKEN } from "../util/constants/settingSystem"

export const JiraAppService = {
    signInJiraApp: (userLogin)=>{
       return Axios({
            url: `${DOMAIN_JIRAAPP}/Users/signin`,
            method: 'POST',
            data: userLogin 
        })
    },
    getAllProjectCategory: ()=>{
        return Axios({
            url: `${DOMAIN_JIRAAPP}/ProjectCategory`,
            method: 'GET'
        })
    },
    createProject: (newProject)=>{
        return Axios({
            url: `${DOMAIN_JIRAAPP}/Project/createProject`,
            method: 'POST',
            data: newProject
        })
    },
    createProjectAuthorization: (newProject)=>{
        return Axios({
            url: `${DOMAIN_JIRAAPP}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    getListProject: () =>{
        return Axios({
            url: `${DOMAIN_JIRAAPP}/Project/getAllProject`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    updateProject: (projectUpdate) => {
        return Axios({
            url: `${DOMAIN_JIRAAPP}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'PUT',
            data: projectUpdate,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}