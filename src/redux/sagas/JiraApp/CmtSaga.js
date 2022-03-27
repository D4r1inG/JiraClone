import { cmtService } from "../../../services/CmtService";
import { call, delay, put, select, takeLatest } from "redux-saga/effects"
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notificationJira } from "../../../util/Notification/NotificationJira";
import { DELETE_CMT_SAGA, GET_TASK_DETAIL_SAGA, POST_CMT_SAGA, UPDATE_CMT_SAGA } from "../../constants/JiraApp/CmtConstant";


function * postCmtSaga(action){
    try{
        const {data, status} = yield call(()=> cmtService.postCmt(action.cmtContent))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskID: action.cmtContent.taskId
            })
        }
    }catch(err){
        console.log(err)
    }
}

export function * theoDoiPostCmtSaga(){
    yield takeLatest(POST_CMT_SAGA, postCmtSaga)
}

function * updateCmtSaga(action){
    const {id, cmtContent} = action
    try{
        const {data, status} = yield call(()=> cmtService.updateCmt(id, cmtContent))
        if(status === STATUS_CODE.SUCCESS){
            notificationJira('success', 'Update comment successful !')

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskID: action.taskId
            })
        }
    }catch(err){
        notificationJira('error', 'Oops! Something went wrong ?!')
        console.log(err)
    }
}

export function * theoDoiUpdateCmtSaga(){
    yield takeLatest(UPDATE_CMT_SAGA, updateCmtSaga)
}

function * deketeCmtSaga(action){
    const {id, taskId} = action
    try{
        const {data, status} = yield call(()=> cmtService.deleteCmt(id))
        if(status === STATUS_CODE.SUCCESS){
            notificationJira('success', 'Delete comment successful !')
            
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskID: taskId
            })
        }
    }catch(err){
        notificationJira('error', 'Oops! Something went wrong ?!')
        console.log(err)
    }
}

export function * theoDoiDeleteCmtSaga(){
    yield takeLatest(DELETE_CMT_SAGA, deketeCmtSaga)
}