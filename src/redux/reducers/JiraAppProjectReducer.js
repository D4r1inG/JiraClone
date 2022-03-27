import { GET_ALL_PROJECT, GET_LIST_PROJECT } from "../constants/JiraApp/ProjectConstants"

const initialState = {
    projectList: [],
    arrProject: []
}

export const JiraAppProjectReducer =  (state = initialState, action) => {
  switch (action.type) {

  case GET_LIST_PROJECT: {
      state.projectList = action.projectList
      return {...state}
  }

  case GET_ALL_PROJECT: {
    return {...state, arrProject: action.arrProject }
}

  default:
    return {...state}
  }
}
