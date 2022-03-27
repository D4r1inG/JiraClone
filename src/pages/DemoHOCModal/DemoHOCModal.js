import React from 'react'
import { useDispatch } from 'react-redux'
import Login from '../Login/Login'
import Register from '../Register/Register'

export default function DemoHOCModal() {

    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    Component: <Login />
                })
            }} type="button" className="btn btn-success btn-lg" data-toggle="modal" data-target="#modelId">
                Login
            </button>

            <button onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    Component: <Register />
                })
            }} type="button" className="btn btn-danger btn-lg" data-toggle="modal" data-target="#modelId">
                Register
            </button>
        </div>
    )
}
