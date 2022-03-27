import Axios from "axios"
import { call, delay, put, takeEvery, takeLatest, select } from "redux-saga/effects"
import { JiraAppService } from "../../../services/JiraAppService"
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem"
import { USER_SIGN_IN_API, USLOGIN } from "../../constants/JiraApp/JiraApp"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst"
import { push } from 'react-router-redux'
import { history } from "../../../util/history"
import { userService } from "../../../services/UserService"
import { notificationJira } from "../../../util/Notification/NotificationJira"
import { GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_SAGA } from "../../constants/JiraApp/UserConstant"
import { notification } from "antd"

//Quan ly action saga
function* signInSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(1000)
    try {
        const { data, status } = yield call(() => JiraAppService.signInJiraApp(action.userLogin))

        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        // let history = yield select(state => state.HistoryReducer.history)

        history.push('/home')
        // action.history.push('/home')

    } catch (err) {
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiSignIn() {
    yield takeLatest(USER_SIGN_IN_API, signInSaga)
}

function* signUpSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const { data, status } = yield call(() => userService.signUpUser(action.userSignUp))
        if(status === STATUS_CODE.SUCCESS){
            history.push('/login')
        }

    } catch (err) {
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiSignUp() {
    yield takeLatest('USER_SIGN_UP_SAGA', signUpSaga)
}

function* getUserSaga(action) {
    try {
        const { status, data } = yield call(() => userService.getUser(action.keyword))
        if (status === STATUS_CODE.SUCCESS) { 
            yield put({
                type: 'GET_ALL_USER',
                arrUser: data.content
            })
            yield put({
                type: 'GET_USER_SEARCH',
                userSearchList: data.content
            })
        }
    } catch (Err) {
        // notificationJira('error', 'Something went wrong!')
        console.log(Err)
    }
}

export function* theoDoiGetUser() {
    yield takeLatest('GET_USER_SAGA', getUserSaga)
}

function* editUserSaga(action) {
    try {
        const { status, data } = yield call(() => userService.editUser(action.userEdit))
        if (status === STATUS_CODE.SUCCESS) {
            notificationJira('success', 'Save change successfully!')
            yield put({
                type: 'GET_USER_SAGA',
                keyword: ''
            })
        }
    } catch (Err) {
        notificationJira('error', 'Something went wrong!')
        console.log(Err)
    }
}

export function* theoDoiEditUser() {
    yield takeLatest('EDIT_USER_SAGA', editUserSaga)
}

function* deleteUserSaga(action) {
    try {
        const { status, data } = yield call(() => userService.deleteUser(action.id))
        if (status === STATUS_CODE.SUCCESS) {
            notificationJira('success', 'Delete user successfully!')
            yield put({
                type: 'GET_USER_SAGA',
                keyword: ''
            })
        }
    } catch (Err) {
        notificationJira('error', 'Something went wrong!')
        console.log(Err)
    }
}

export function* theoDoiDeleteUser() {
    yield takeLatest('DELETE_USER_SAGA', deleteUserSaga)
}

function* addUserSaga(action) {
    try {
        const { status, data } = yield call(() => userService.assignUserProject(action.userProject))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_LIST_PROJECT_SAGA',
            })
            notificationJira('success', 'Member has been successfully added!')
        }
    } catch (Err) {
        notificationJira('error', 'Something went wrong!')
        console.log(Err)
    }
}

export function* theoDoiAddUserCategory() {
    yield takeLatest('ADD_USER_SAGA_API', addUserSaga)
}


function* removeUserSaga(action) {
    try {
        const { status, data } = yield call(() => userService.removeUserFromProject(action.userProject))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_LIST_PROJECT_SAGA',
            })
            notificationJira('success', 'Member has been successfully removed!')
        }
    } catch (Err) {
        notificationJira('error', 'Something went wrong!')
        console.log(Err)
    }
}

export function* theoDoiRemoveUserCategory() {
    yield takeLatest('REMOVE_USER_SAGA_API', removeUserSaga)
}

function* getUserByProjectSaga(action) {
    try {
        const { status, data } = yield call(() => userService.getUserByProjectId(action.projectId))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT,
                arrUser: data.content
            })
        } 
    } catch (Err) {
        console.log(Err)
        if (Err.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
            // notificationJira('error', 'Project doesnt have any users!')
            yield put({
                type: GET_USER_BY_PROJECT,
                arrUser: []
            })
        }
    }
}

export function* theoDoiGetUserByProjectCategory() {
    yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserByProjectSaga)
}