import { call, delay, put, takeLatest } from "redux-saga/effects"
import { statusService } from "../../../services/StatusService"
import { taskService } from "../../../services/TaskService"
import { STATUS_CODE } from "../../../util/constants/settingSystem"
import { notificationJira } from "../../../util/Notification/NotificationJira"
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst"

function* GetAllStatusSaga(action) {

    try {
        const { data, status } = yield call(() => statusService.getAllStatus())

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_ALL_STATUS',
                status: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function * theoDoiGetAllStatusTaskSaga(){
    yield takeLatest('GET_ALL_STATUS_SAGA', GetAllStatusSaga )
}