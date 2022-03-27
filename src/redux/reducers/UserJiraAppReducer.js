import { USER_LOGIN } from "../../util/constants/settingSystem"
import { USLOGIN } from "../constants/JiraApp/JiraApp"
import { GET_USER_BY_PROJECT } from "../constants/JiraApp/UserConstant"

let usLogin = {}

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
  usLogin,
  userSearch: [],
  arrUser: [],
  arrAllUser: []
}

export const UserJiraAppReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_ALL_USER': {
      return {...state, arrAllUser: action.arrUser}
    }

    case USLOGIN: {
      state.usLogin = action.userLogin
      return {...state}
    }

    case 'GET_USER_SEARCH': {
      state.userSearch = action.userSearchList
      return {...state}
    }

    case GET_USER_BY_PROJECT: {
      return {...state, arrUser: action.arrUser}
    }

    default:
      return { ...state }
  }
}
