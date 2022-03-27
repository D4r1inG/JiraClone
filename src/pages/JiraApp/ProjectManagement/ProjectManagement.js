import React, { useEffect, useRef, useState } from 'react'
import { Table, Input, Button, Space, Avatar, Popover, AutoComplete } from 'antd';
// import ReactHtmlParser from 'react-html-parser';
import parse from 'html-react-parser';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Tag, Divider } from 'antd';
import { EDIT_PROJECT, OPEN_DRAWER } from '../../../redux/constants/JiraApp/JiraApp';
import FormEditProject from '../../../components/forms/FormEditProject';
import { Popconfirm, message } from 'antd';
import { notificationJira } from '../../../util/Notification/NotificationJira';
import { NavLink } from 'react-router-dom';
import { USER_LOGIN } from '../../../util/constants/settingSystem';

export default function ProjectManagement(props) {

    const projectList = useSelector(state => state.JiraAppProjectReducer.projectList)
    const myProjectList = projectList?.filter(item => item.creator.id === JSON.parse(localStorage.getItem(USER_LOGIN)).id)

    const userSearch = useSelector(state => state.UserJiraAppReducer.userSearch)
    const searchRef = useRef(null)

    const [value, setValue] = useState('')
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })
    const [changeValue, setChangeValue] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: 'GET_LIST_PROJECT_SAGA',
        })
    }, [])

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectDetail/${record.id}`}>{text}</NavLink>
            },

        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',

        },
        {
            title: "Creator",
            key: "creator",
            render: (text, record, index) => (
                <Tag color="gold">{text.creator?.name}</Tag>
            ),
        },
        {
            title: "Members",
            key: "members",
            render: (text, record, index) => {
                return <div>
                    {text.members?.slice(0, 1).map((item, index) => {
                        return <Popover key={index} placement="bottom" title={'Members'} content={() => {
                            return <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members?.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td><img src={item.avatar} alt={index} width='30' height='30' style={{ borderRadius: '50%' }} /></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => {
                                                    dispatch({
                                                        type: 'REMOVE_USER_SAGA_API',
                                                        userProject: {
                                                            projectId: record.id,
                                                            userId: item.userId,
                                                        }
                                                    })
                                                }}></Button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}>
                            <Avatar key={index} className='ml-1' src={item.avatar} />
                        </Popover>
                    })}
                    {text.members?.length > 1 ? <Popover key={index} placement="bottom" title={'Members'} content={() => {
                        return <table className='table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.members?.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.userId}</td>
                                        <td><img src={item.avatar} alt={index} width='30' height='30' style={{ borderRadius: '50%' }} /></td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => {
                                                dispatch({
                                                    type: 'REMOVE_USER_SAGA_API',
                                                    userProject: {
                                                        projectId: record.id,
                                                        userId: item.userId,
                                                    }
                                                })
                                            }}></Button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }}>
                        <Avatar className='ml-1'>...</Avatar>
                    </Popover> : ''}
                    <Popover className='ml-1' placement="bottom" title={'Add member'} content={() => (
                        <AutoComplete
                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            value={value}
                            onChange={(value) => {
                                setValue(value)
                            }}
                            onSelect={async (value, option) => {
                                dispatch({
                                    type: 'ADD_USER_SAGA_API',
                                    userProject: {
                                        projectId: text.id,
                                        userId: option.value
                                    }
                                })
                                setValue('')
                            }}
                            style={{ width: '100%' }}
                            onSearch={(values) => {
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current)
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch({
                                        type: 'GET_USER_SAGA',
                                        keyword: values
                                    })
                                }, 300)

                            }} />
                    )} trigger="click">
                        <Button shape="circle" icon={<PlusOutlined />}></Button>
                    </Popover>
                </div>
            }
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: (text, record, index) => {
        //         let jsxContent = parse(text)
        //         return <div key={index}>
        //             {jsxContent}
        //         </div>
        //     },
        //     filteredValue: filteredInfo.address || null,
        //     onFilter: (value, record) => record.address.includes(value),
        //     sorter: (a, b) => a.address.length - b.address.length,
        //     sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        //     ellipsis: true,
        // },
        {
            title: "Action",
            key: "action",
            render: (text, record, index) => (
                <Space size="middle">
                    <button className='btn btn-primary' onClick={() => {
                        dispatch({
                            type: 'OPEN_FORM_EDIT',
                            Component: <FormEditProject />,
                            projectName: record.projectName
                        })
                        dispatch({
                            type: EDIT_PROJECT,
                            projectEdit: text
                        })
                    }}><EditOutlined /></button>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => {
                            dispatch({
                                type: 'DELETE_PROJECT_SAGA',
                                id: text.id
                            })
                        }
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className='btn btn-danger'><DeleteOutlined /></button>
                    </Popconfirm>
                </Space>
            ),
        }
    ];

    return (
        <div className='container mt-5' style={{ paddingLeft: '12%' }}>
            <h3>Project management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={() => {
                    setChangeValue(true)
                }}>All projects</Button>
                <Button onClick={() => {
                    setChangeValue(false)
                }}>My projects</Button>
            </Space>
            <Table columns={columns} rowKey={'id'} dataSource={changeValue ? projectList : myProjectList} onChange={handleChange} />
        </div>
    );
}
