import Axios from "axios"
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects"
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASK_API, GET_TASK_LIST_API, REJECT_TASK_API } from "../constants/ToDoListConstants"
import { toDoListService } from '../../services/ToDoListService'
import { STATUS_CODE } from "../../util/constants/settingSystem"
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst"

function* getTaskApiAction(action) {
    //    while(true){
    //     yield take('getTaskApiAction')
    //     console.log('abc');
    //    }
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        let { data, status } = yield call(toDoListService.getTaskApi)
        yield delay(1000)

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API,
                taskList: data
            })
        } else {
            console.log('error')
        }

    } catch (err) {
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASK_LIST_API, getTaskApiAction)
}

function* addTaskApiAction({ taskName }) {
    try {
        const { data, status } = yield call(() => { return toDoListService.addTaskApi(taskName) })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST_API
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}

function* deleteTaskApiAction({ taskName }) {
    try {
        const { status } = yield call(() => { return toDoListService.deleteTaskApi(taskName) })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST_API
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApiAction)
}

function* checkTaskApiAction({ taskName }) {
    try {
        const { status } = yield call(() => { return toDoListService.checkTaskApi(taskName) })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST_API
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiActionCheckTaskApi() {
    yield takeLatest(CHECK_TASK_API, checkTaskApiAction)
}

function* rejectTaskApiAction({ taskName }) {
    try {
        const { status } = yield call(() => (toDoListService.rejectTaskApi(taskName)))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_LIST_API
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiActionRejectTaskApi() {
    yield takeLatest(REJECT_TASK_API, rejectTaskApiAction)
}
