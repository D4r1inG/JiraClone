import { EDIT_PROJECT } from "../constants/JiraApp/JiraApp"
import { PUT_PROJECT_DETAIL } from "../constants/JiraApp/ProjectConstants"

const initialState = {
    projectEdit: {},
    projectDetail: {}
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

        case EDIT_PROJECT:{
            state.projectEdit = {... action.projectEdit}
            return {...state}
        }

        case PUT_PROJECT_DETAIL: {
            state.projectDetail = action.projectDetail
            return {...state}
        }
        
        default:
            return {...state}
    }
}
