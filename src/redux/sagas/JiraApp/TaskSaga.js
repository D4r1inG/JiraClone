import { notification } from "antd"
import { call, delay, put, select, takeLatest } from "redux-saga/effects"
import { taskService } from "../../../services/TaskService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { notificationJira } from "../../../util/Notification/NotificationJira"
import { GET_TASK_DETAIL_SAGA } from "../../constants/JiraApp/CmtConstant"
import { CLOSE_DRAWER, GET_PROJECT_DETAIL_SAGA } from "../../constants/JiraApp/JiraApp"
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, CREATE_TASK_SAGA, DELETE_MEMBER, GET_TASK_DETAIL, UPDATE_TASK_STATUS_SAGA } from "../../constants/JiraApp/TaskConstant"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst"

function* createTaskSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(500)

    try {
        const { data, status } = yield call(() => taskService.createTask(action.taskObj))

        if (status === STATUS_CODE.SUCCESS) {
            notificationJira('success', 'Create task successful !')
        } else {
            notificationJira('error', 'Oops! Something went wrong ?!')
        }

        yield put({
            type: CLOSE_DRAWER
        })

    } catch (error) {
        console.log(error)
    }

    yield put({
        type: HIDE_LOADING
    })

}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}


function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(action.taskID))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetail: data.content
            })

        } else {
            notificationJira('error', 'Oops! Something went wrong ?!')
        }

    } catch (error) {
        console.log(error)
    }

}

export function* theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}



function* updateTaskStatusSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.updateStatusTask(action.taskStatusUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                id: action.taskStatusUpdate.projectId
            })
        } else {
            notificationJira('error', 'Oops! Something went wrong ?!')
        }
    } catch (error) {
        console.log(error)
    }
}

export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga)
}

function* handleChangePostApi(action) {

    switch (action.actionType) {

        case CHANGE_TASK_MODAL: {
            const { name, value } = action
            yield put({
                type: action.actionType,
                name,
                value
            })
            break
        }

        case CHANGE_ASSIGNESS: {
            const { userSelect } = action
            yield put({
                type: action.actionType,
                userSelect
            })
            break
        }

        case DELETE_MEMBER: {
            const { id } = action
            yield put({
                type: action.actionType,
                id
            })
            break
        }

        default: return
    }

    const { taskDetail } = yield select(state => state.TaskReducer)
    const listUserAsign = taskDetail.assigness?.map((item, index) => {
        return item.id
    })

    const taskUpdate = { ...taskDetail, listUserAsign }
    try {
        const { data, status } = yield call(() => taskService.updateTask(taskUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                id: taskUpdate.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskID: taskUpdate.taskId
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* theoDoiHandleChangePostApi() {
    yield takeLatest('HANDLE_CHANGE_POST_API', handleChangePostApi)
}