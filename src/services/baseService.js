import Axios  from "axios"
import { DOMAIN_JIRAAPP, TOKEN } from "../util/constants/settingSystem"

export class baseService {
    put = (url, model) =>{
        return  Axios({
            url: `${DOMAIN_JIRAAPP}/${url}`,
            method: 'PUT',
            data: model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }

    Post = (url, model) => {
        return  Axios({
            url: `${DOMAIN_JIRAAPP}/${url}`,
            method: 'POST',
            data: model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }

    Get = (url) => {
        return  Axios({
            url: `${DOMAIN_JIRAAPP}/${url}`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }

    Delete = (url) => {
        return  Axios({
            url: `${DOMAIN_JIRAAPP}/${url}`,
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })  
    }
}