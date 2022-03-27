import { call, delay, put, takeLatest } from "redux-saga/effects";
import { JiraAppService } from "../../../services/JiraAppService";
import { ProjectService, projectService } from "../../../services/ProjectService";
import { userService } from "../../../services/UserService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { notificationJira } from "../../../util/Notification/NotificationJira";
import { CLOSE_DRAWER, CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_PROJECT_DETAIL_SAGA } from "../../constants/JiraApp/JiraApp";
import { GET_ALL_PROJECT, GET_LIST_PROJECT, PUT_PROJECT_DETAIL, UPDATE_PROJECT_SAGA } from "../../constants/JiraApp/ProjectConstants";
import { GET_USER_BY_PROJECT_SAGA } from "../../constants/JiraApp/UserConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";


function* createProjectCategorySaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)

    try {
        const { data, status } = yield call(() => JiraAppService.createProjectAuthorization(action.newProject))
        history.push('/projectManagement')
    } catch (err) {
        console.log(err.response.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetCreateProjectCategory() {
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectCategorySaga)
}


/*-------------------------------------------*/
function* getListProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)

    try {
        const { status, data } = yield call(() => JiraAppService.getListProject())
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content
            })
        
        }
    } catch (Err) {
        console.log(Err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetListProjectCategory() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga)
}


/*-------------------------------------------*/
function* updateProjectSaga(action) {
    try {
        const { status, data } = yield call(() => JiraAppService.updateProject(action.projectUpdate))
        yield put({
            type: CLOSE_DRAWER
        })
        if (status === STATUS_CODE.SUCCESS) {
            const { data, status } = yield call(() => { return JiraAppService.getAllProjectCategory() })
            yield put({
                type: GET_LIST_PROJECT_SAGA,
            })
        }
    } catch (Err) {
        console.log(Err)
    }
}

export function* theoDoiUpdateProjectCategory() {
    yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga)
}


/*-------------------------------------------*/
function* deleteProjectSaga(action) {
    try {
        const { status, data } = yield call(() => projectService.deleteProject(action.id))
        yield put({
            type: CLOSE_DRAWER
        })
        if (status === STATUS_CODE.SUCCESS) {
            notificationJira('success', 'Project has been successfully deleted!')
            yield put({
                type: GET_LIST_PROJECT_SAGA,
            })
        } else {
            notificationJira('error', 'Something went wrong!')

        }
    } catch (Err) {
        notificationJira('error', 'Something went wrong!')
        console.log(Err)
    }
}

export function* theoDoiDeleteProjectCategory() {
    yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
}

/*-------------------------------------------*/

function* getProjectDetailSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)

    try {
        const { status, data } = yield call(() => projectService.getDetailProject(action.id))

        yield put({
            type: PUT_PROJECT_DETAIL,
            projectDetail: data.content
        })

    } catch (Err) {
        console.log(Err)
        history.push('/projectManagement')
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetProjectCategory() {
    yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga)
}

/*-------------------------------------------*/

function* getAllProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)

    try {
        const { status, data } = yield call(() => projectService.getAllproject())

        yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })
        if(action.getUser){
            yield put({
                type: GET_USER_BY_PROJECT_SAGA,
                projectId: data.content[0].id
            })
        }

    } catch (Err) {
        console.log(Err)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga)
}

/*-------------------------------------------*/
