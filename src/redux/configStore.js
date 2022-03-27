import { applyMiddleware, combineReducers, createStore } from 'redux'
import ToDoListReducer from './reducers/ToDoListReducer'
import LoadingReducer from './reducers/LoadingReducer'
import { ModalReducer } from './reducers/ModalReducer'
import reduxThunk from 'redux-thunk'
import { UserJiraAppReducer } from './reducers/UserJiraAppReducer'

// redux saga
import { rootSaga } from './sagas/rootSaga'
import { HistoryReducer } from './reducers/HistoryReducer'
import createSagaMiddleware from '@redux-saga/core'
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer'
import { JiraAppProjectReducer } from './reducers/JiraAppProjectReducer'
import { DrawerJiraAppReducer } from './reducers/DrawerJiraAppReducer'
import { ProjectReducer } from './reducers/ProjectReducer'
import { TaskTypeReducer } from './reducers/TaskTypeReducer'
import { PiorityReducer } from './reducers/PiorityReducer'
import { StatusReducer } from './reducers/StatusReducer'
import { TaskReducer } from './reducers/TaskReducer'

const middleWareSaga = createSagaMiddleware()

const rootReducer = combineReducers({
    //reducer dat tai day 
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    HistoryReducer,
    UserJiraAppReducer,
    ProjectCategoryReducer,
    JiraAppProjectReducer,
    DrawerJiraAppReducer,
    ProjectReducer,
    TaskTypeReducer,
    PiorityReducer,
    StatusReducer,
    TaskReducer,
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga))

middleWareSaga.run(rootSaga)


export default store