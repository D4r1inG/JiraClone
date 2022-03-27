import Axios from 'axios'
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'
import { GET_TASK_API } from '../constants/ToDoListConstants'
import * as ToDoListSaga from './ToDoListSaga'
import * as JiraApp from './JiraApp/UserJiraAppSaga'
import * as ProjectCategorySaga from './JiraApp/ProjectCategorySaga'
import * as ProjectSaga from './JiraApp/ProjectSaga'
import * as TaskTypeSaga from './JiraApp/TaskTypeSaga'
import * as PrioritySaga from './JiraApp/PrioritySaga'
import * as TaskSaga from './JiraApp/TaskSaga'
import * as StatusSaga from './JiraApp/StatusSaga'
import * as CmtSaga from './JiraApp/CmtSaga'

export function* rootSaga() {
    // yield fork(getTaskApi)

    yield all([
        ToDoListSaga.theoDoiActionGetTaskApi(),
        ToDoListSaga.theoDoiActionAddTaskApi(),
        ToDoListSaga.theoDoiActionDeleteTaskApi(),
        ToDoListSaga.theoDoiActionCheckTaskApi(),
        ToDoListSaga.theoDoiActionRejectTaskApi(),

        //user
        JiraApp.theoDoiSignIn(),
        JiraApp.theoDoiGetUser(),
        JiraApp.theoDoiAddUserCategory(),
        JiraApp.theoDoiRemoveUserCategory(),
        JiraApp.theoDoiGetUserByProjectCategory(),
        JiraApp.theoDoiSignUp(),
        JiraApp.theoDoiEditUser(),
        JiraApp.theoDoiDeleteUser(),

        //Project
        ProjectCategorySaga.theoDoiGetAllProjectCategory(),
        ProjectSaga.theoDoiGetCreateProjectCategory(),
        ProjectSaga.theoDoiGetListProjectCategory(),
        ProjectSaga.theoDoiUpdateProjectCategory(),
        ProjectSaga.theoDoiDeleteProjectCategory(),
        ProjectSaga.theoDoiGetProjectCategory(),
        ProjectSaga.theoDoiGetAllProjectCategory(),

        //Task Type
        TaskTypeSaga.theoDoiGetAllTaskType(),

        //Priority 
        PrioritySaga.theoDoiGetAllPriority(),

        //Task
        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoiGetTaskDetailSaga(),
        TaskSaga.theoDoiUpdateTaskStatusSaga(),
        TaskSaga.theoDoiHandleChangePostApi(),
        
        //Status
        StatusSaga.theoDoiGetAllStatusTaskSaga(),

        //CMT
        CmtSaga.theoDoiPostCmtSaga(),
        CmtSaga.theoDoiUpdateCmtSaga(),
        CmtSaga.theoDoiDeleteCmtSaga()
    ])
}