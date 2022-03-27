import { GET_ALL_PROJECT_CATEGORY } from "../constants/JiraApp/JiraApp"

const initialState = {
    arrProject: []
}

export const ProjectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_ALL_PROJECT_CATEGORY:{
        state.arrProject = action.arrProject
        return {...state}
    }
  default:
    return {...state}
  }
}
