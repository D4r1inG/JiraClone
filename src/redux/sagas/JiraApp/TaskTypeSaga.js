import { call, put, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../../../services/TaskTypeService";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../../constants/JiraApp/TaskTypeConstant";

function* getAllTaskType(action) {
    try {
       const {status, data} = yield call(() => (taskTypeService.getAllTaskType()))

       yield put({
           type: GET_ALL_TASK_TYPE,
           arrTaskType: data.content
       })
    } catch (err) {
        console.log(err)
    }
}

export function * theoDoiGetAllTaskType(){
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskType)
} 