import React, { Component } from 'react'
import style from './ToDoList.css'
import Axios from 'axios'

export default class ToDoList extends Component {

    //http://svcy.myclass.vn/swagger/

    state = {
        taskList: [],
        values:{
            taskName: ''
        },
        errors:{
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })

        promise.then((result) => {
            this.setState({
                taskList: result.data
            })
        })
        promise.catch((err) => {
            console.log(err);
        })
    }

    deleteTask = (taskName)=>{
        let promise = Axios({
            url:`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE',
        })
        promise.then(()=>{
            this.getTaskList()
        })
        promise.catch((err) => {
            console.log(err);
        })
    }

    doneTask = (taskName)=>{
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(()=>{
            this.getTaskList()
        })
        promise.catch((err) => {
            console.log(err);
        })
    }

    rejectTask = (taskName)=>{
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(()=>{
            this.getTaskList()
        })
        promise.catch((err) => {
            console.log(err);
        })
    }

    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return (<li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={()=>{
                        this.deleteTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button' onClick={()=>{
                        this.doneTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>)
        })
    }

   
    renderTaskComplete = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.taskName}</span>
                    <div className="buttons">
                        <button className="remove" type='button' onClick={()=>{
                            this.deleteTask(item.taskName)
                        }}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button className="complete" onClick={()=>{this.rejectTask(item.taskName)}}>
                            <i className="far fa-undo" />
                            <i className="fas fa-undo" />
                        </button>
                    </div>
                </li>
            )
        })
    }

    componentDidMount = ()=>{
        this.getTaskList()
    }

    addTask = (e)=>{
        e.preventDefault()
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {taskName: this.state.values.taskName}
        })

        promise.then(result => {
            this.getTaskList()
        })
        promise.catch(error => {
            
        })
    }

    handleChange = (e)=>{
        const {value, name} = e.target
        let newValue = {...this.state.values}
        newValue = {...newValue,[name]: value}

        let newError = {...this.state.error}
        let re = /^[a-z A-Z]+$/

        if(!re.test(value) || value.trim() === ''){
            newError[name] = name + 'invalid!'
        }else{
            newError[name] = ''
        }

        this.setState({
            ...this.state,
            values: newValue,
            errors: newError
        })
    }

    render() {
        return <div>
            <form className="card" onSubmit={this.addTask}>
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
                            <input name='taskName' id="newTask" type="text" onChange={this.handleChange} placeholder="Enter an activity..." />
                            <button id="addItem" onClick={()=>{}}>
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p className='text text-danger'>{this.state.errors.taskName}</p>
                        <div className="card__todo">
                            <ul className="todo" id="todo">
                                {this.renderTaskToDo()}

                            </ul>
                            <ul className="todo" id="completed">
                                {this.renderTaskComplete()}

                            </ul>
                        </div>
                    </div>
                </div>
            </form>

        </div>;
    }
}
