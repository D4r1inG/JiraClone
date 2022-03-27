import React, { useEffect, useRef, useState } from 'react'
import { Table, Tag, Space, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CloseSquareOutlined } from '@ant-design/icons';
import { Popconfirm, message, Button } from 'antd';
import { notificationJira } from '../../../util/Notification/NotificationJira';
import { DELETE_USER_SAGA, EDIT_USER_SAGA, GET_USER_SAGA } from '../../../redux/constants/JiraApp/UserConstant';

export default function UserManagement() {

    const dispatch = useDispatch()
    const { arrAllUser } = useSelector(state => state.UserJiraAppReducer)
    const [visibleEditUser, setVisibleEditUser] = useState(-1)

    const [userEdit, setUserEdit] = useState({
        values: {
            name: '',
            phoneNumber: '',
            email: '',
        },
        errors: {
            name: '',
            phoneNumber: '',
            email: '',
        }
    })

    useEffect(() => {
        dispatch({
            type: GET_USER_SAGA,
            keyword: ''
        })
    }, [])

    const refName = useRef(null)
    const refPhone = useRef(null)
    const refEmail = useRef(null)

    const handleChangeInputSearch = (e) => {
        setTimeout(() => {
            dispatch({
                type: GET_USER_SAGA,
                keyword: e.target.value
            })
        }, 300)
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        let newValue = { ...userEdit.values, [name]: value }
        let newError = { ...userEdit.errors }

        if (value.trim() === '') {
            newError[name] = name + ' is required!'
        } else {
            newError[name] = ''
        }

        if (name === 'email') {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(value)) {
                newError[name] = 'Email is invalid!'
            } else {
                newError[name] = ''
            }
        }

        if (name === 'phoneNumber') {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            if (!re.test(value)) {
                newError[name] = 'Phone number is invalid!'
            } else {
                newError[name] = ''
            }
        }

        setUserEdit({
            values: newValue,
            errors: newError
        })
    }

    const handleSaveChange = (id) => {
        const { errors, values } = userEdit
        let valid = true
        for (let key in errors) {
            if (errors[key] !== '') {
                valid = false
            }
        }
        if (valid) {
            dispatch({
                type: EDIT_USER_SAGA,
                userEdit: {
                    id,
                    email: values.email === '' ? refEmail.current.props.defaultValue : values.email,
                    phoneNumber: values.phoneNumber === '' ? refPhone.current.props.defaultValue : values.phoneNumber,
                    name: values.name === '' ? refName.current.props.defaultValue : values.name,
                }
            })
            setVisibleEditUser(-1)
        } else {
            notificationJira('error', 'Please check input and try again!')
        }
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId',
            render: (text, record) => {
                return <div>
                    {visibleEditUser === record.userId ?
                        <div style={{ position: 'relative' }} >
                            <Input defaultValue={record.userId} disabled />
                        </div>
                        : <a>{record.userId}</a>}
                </div>
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return <div>
                    {visibleEditUser === record.userId ?
                        <div style={{ position: 'relative' }} >
                            <Input defaultValue={record.name} ref={refName} name='name' allowClear onChange={handleChange} />
                            <span className='text-danger' style={{ position: 'absolute', bottom: -23, left: 0 }}>{userEdit.errors.name}</span>
                        </div>
                        : <a>{record.name}</a>}
                </div>
            }
        },
        {
            title: 'Avatar',
            key: 'avatar',
            dataIndex: 'avatar',
            render: (text, record) => {
                return <img src={record.avatar} key={record.userId} alt={record.userId} width='30' height='30' style={{ borderRadius: '50%' }} />
            }
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (text, record) => {
                return <div>
                    {visibleEditUser === record.userId ?
                        <div style={{ position: 'relative' }}>
                            <Input defaultValue={record.phoneNumber} ref={refPhone} showCount='true' name='phoneNumber' allowClear onChange={handleChange} />
                            <span className='text-danger' style={{ position: 'absolute', bottom: -23, left: 0 }}>{userEdit.errors.phoneNumber}</span>
                        </div>
                        : <a>{record.phoneNumber}</a>}
                </div>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => {
                return <div>
                    {visibleEditUser === record.userId ?
                        <div style={{ position: 'relative' }}>
                            <Input defaultValue={record.email} ref={refEmail} name='email' allowClear onChange={handleChange} />
                            <span className='text-danger' style={{ position: 'absolute', bottom: -23, left: 0 }}>{userEdit.errors.email}</span>
                        </div>
                        : <a>{record.email}</a>}
                </div>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return <Space key={record.userId} size="middle">
                    {visibleEditUser !== record.userId ? <span style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                        setVisibleEditUser(record.userId)
                        setUserEdit({
                            values: {
                                name: '',
                                phoneNumber: '',
                                email: '',
                            },
                            errors: {
                                name: '',
                                phoneNumber: '',
                                email: '',
                            }
                        })
                    }}>Edit</span> : ''}

                    {visibleEditUser === record.userId ?
                        <div className='d-flex flex-column align-items-center'>
                            <Popconfirm
                                placement="bottom"
                                title={'Save changes ?'}
                                onConfirm={() => { handleSaveChange(record.userId) }}
                                okText="Yes"
                                cancelText="No">
                                <span style={{ color: '#929398', cursor: 'pointer' }}>Save</span>
                            </Popconfirm>
                            <span style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                                setVisibleEditUser(-1)
                            }}>Cancel</span>
                        </div> : ''}

                    <Popconfirm
                        placement="bottom"
                        title={'Are you sure to delete user ?'}
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_USER_SAGA,
                                id: record.userId
                            })
                        }}
                        okText="Yes"
                        cancelText="No"><span style={{ color: '#929398', cursor: 'pointer' }}>Delete</span>
                    </Popconfirm>
                </Space>
            },
        },
    ];

    return (
        <div className='container mt-5' style={{ paddingLeft: '12%' }}>
            <h3>User management</h3>
            <div className='d-flex'>
                <Input placeholder="Search user" className='mb-3' allowClear onChange={handleChangeInputSearch} />
            </div>

            <Table columns={columns} rowKey={'userId'} dataSource={arrAllUser} />
        </div>
    )
}
