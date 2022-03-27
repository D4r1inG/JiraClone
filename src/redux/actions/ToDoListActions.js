import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConstants";

export const getTaskListAPI = () => {
    return async dispatch => {
        try {
            let { data, status } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            })
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data,
                })
            }
        } catch (err) {
            console.log(err.response.data.message);
        }
    }
}

export const addTaskListAPI = (taskName) => {
    return async dispatch => {
        try {
            let { data, status } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: taskName }
            })
            if (status === 200) {
                dispatch(getTaskListAPI())
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const deleteTasktAPI = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE',
        })
        promise.then(() => {
            dispatch(getTaskListAPI())
        })
        promise.catch((err) => {
            console.log(err);
        })
    }
}

export const doneTasktAPI = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(() => {
            dispatch(getTaskListAPI())
        })
        promise.catch((err) => {
            console.log(err);
        })
    }
}

export const rejectTasktAPI = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(() => {
            dispatch(getTaskListAPI())
        })
        promise.catch((err) => {
            console.log(err);
        })
    }
}