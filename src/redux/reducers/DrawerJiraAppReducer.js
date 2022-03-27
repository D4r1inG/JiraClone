import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM_CREATE_TASK, OPEN_FORM_EDIT, SET_DISABLED_SUBMIT, SET_SUBMIT_CREATE_TASK, SET_SUBMIT_EDIT_PROJECT } from "../constants/JiraApp/JiraApp"
import React from "react"

const initialState = {
    visible: false,
    projectName: '',
    ComponentContentDrawer: <p>Default content</p>,
    callBackSubmit: (propValues)=>{ },
    submitDisabled: false
}

export const DrawerJiraAppReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER: {
            return { ...state, visible: true }
        }
        case CLOSE_DRAWER: {
            return { ...state, visible: false }
        }
        case OPEN_FORM_EDIT: {
            state.ComponentContentDrawer = action.Component
            state.projectName = action.projectName
            return {...state, visible: true}
        }
        case SET_SUBMIT_EDIT_PROJECT :{
            state.callBackSubmit = action.submitFuction
            return {...state}
        }
        case SET_SUBMIT_CREATE_TASK: {
            return {...state, callBackSubmit: action.submitFuction}
        }
        case OPEN_FORM_CREATE_TASK:{
            state.ComponentContentDrawer = action.Component
            state.projectName = action.title
            return {...state, visible: true}
        }
        case SET_DISABLED_SUBMIT: {
            return {...state, submitDisabled: action.submitDisabled}
        }

        default:
            return {...state}
    }
}
