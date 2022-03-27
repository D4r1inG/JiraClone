import { call, put, takeLatest } from "redux-saga/effects";
import { JiraAppService } from "../../../services/JiraAppService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_SAGA } from "../../constants/JiraApp/JiraApp";



function* getAllProjectCategorySaga(action) {
    try {
        const { data, status } = yield call(() => { return JiraAppService.getAllProjectCategory() })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                arrProject: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectCategorySaga)
}