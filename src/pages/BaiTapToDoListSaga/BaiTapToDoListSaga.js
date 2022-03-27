import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASK_LIST_API, REJECT_TASK_API } from '../../redux/constants/ToDoListConstants';

export default function BaiTapToDoListSaga(props) {

    const dispatch = useDispatch()
    const taskList = useSelector(state => state.ToDoListReducer.taskList)

    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    })

    useEffect(() => {
        getTaskList()
    }, [])

    const handleChange = (e) => {
        const { value, name } = e.target
        let newValue = { ...state.values }
        newValue = { ...newValue, [name]: value }

        let newError = { ...state.error }
        let re = /^[a-z A-Z]+$/

        if (!re.test(value) || value.trim() === '') {
            newError[name] = name + 'invalid!'
        } else {
            newError[name] = ''
        }

        setState({
            ...state,
            values: newValue,
            errors: newError
        })
    }

    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return (<li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => {
                        deleteTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button' onClick={() => {
                        doneTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>)
        })
    }


    const renderTaskComplete = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.taskName}</span>
                    <div className="buttons">
                        <button className="remove" type='button' onClick={() => {
                            deleteTask(item.taskName)
                        }}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button className="complete" onClick={() => { rejectTask(item.taskName) }}>
                            <i className="far fa-undo" />
                            <i className="fas fa-undo" />
                        </button>
                    </div>
                </li>
            )
        })
    }
    const getTaskList = () => {
        dispatch({
            type: GET_TASK_LIST_API
        })
    }

    const addTask = (e) => {
        e.preventDefault()
        dispatch({
            type: ADD_TASK_API,
            taskName: state.values.taskName
        })
    }

    const deleteTask = (taskName) => {
        dispatch({
            type: DELETE_TASK_API,
            taskName
        })
    }

    const doneTask = (taskName) => {
        dispatch({
            type: CHECK_TASK_API,
            taskName
        })
    }

    const rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API,
            taskName
        })
    }


    return <div>
        <form className="card" onSubmit={addTask}>
            <div className="card__header">
                <img src={require("./X2oObC4.png")} />
            </div>
            <div className="card__body">
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" type="text" name='taskName' onChange={handleChange} placeholder="Enter an activity..." />
                        <button id="addItem">
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>
                        <ul className="todo" id="completed">
                            {renderTaskComplete()}
                        </ul>
                    </div>
                </div>
            </div>
        </form>

    </div>;
}
