import { Input } from 'antd';
import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';

export default function Login(props) {

    let [login, setLogin] = useState({ userName: '', password: '', status: false})

    const handleChange = (e) => {
        const {name, value} = e.target
        setLogin({
            ...login,[name]:value
        })
    }

    const handleLogin = (e)=>{
        e.preventDefault()
        if(login.userName === 'quan' && login.password === 'quan'){
            props.history.goBack()
            setLogin({...login, status: true})
            // localStorage.setItem('userLogin', JSON.stringify(login))
        }else{
            return
        }
    }

    return <form className='container' onSubmit={handleLogin}>
        <h3 className='display-4'>Login</h3>
        <div className='form-group'>
            <p>Tai Khoan</p>
            <input name='userName' className='form-control' onChange={handleChange} />
        </div>
        <div className='form-group'>
            <p>Mat khau</p>
            <input name='password' className='form-control' onChange={handleChange} />
        </div>
        <div className='form-group'>
            <button className='btn btn-success'>Dang nhap</button>
        </div>
        <Prompt when={login.status} message={(location)=>{
            console.log(location);
            return 'Bạn có chắc muốn rời đi?'
        }} />
     </form>;
}
