import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import parse from 'html-react-parser';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/JiraApp/PriorityConstant';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/JiraApp/TaskTypeConstant';
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { USER_LOGIN } from '../../../util/constants/settingSystem';


const { Option } = Select

export default function ModalJiraApp(props) {

    const { taskDetail } = useSelector(state => state.TaskReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrPriority } = useSelector(state => state.PiorityReducer)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const { projectDetail } = useSelector(state => state.ProjectReducer)

    const dispatch = useDispatch()

    // console.log(taskDetail)
    // console.log(projectDetail)

    const [visibleEditor, setvisibleEditor] = useState(false)
    const [hitoryEditor, setHitoryEditor] = useState(taskDetail.description)
    const [taskID, setTaskID] = useState(taskDetail.taskId)
    const [renderSelect, setRenderSelect] = useState(false)
    const [visibleCmtEdit, setVisibleCmtEdit] = useState(-1)

    useEffect(() => {
        dispatch({
            type: 'GET_ALL_STATUS_SAGA'
        })
        dispatch({
            type: GET_ALL_PRIORITY_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
    }, [])

    const editorRef = useRef(null);
    const cmtRef = useRef(null)
    const cmtEditorRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target

        dispatch({
            type: 'HANDLE_CHANGE_POST_API',
            actionType: 'CHANGE_TASK_MODAL',
            name,
            value
        })

        // dispatch({
        //     type: 'CHANGE_TASK_MODAL',
        //     name,
        //     value
        // })
    }


    const renderDescription = () => {
        const jsxDesc = parse(taskDetail.description)
        return <div key={taskDetail.projectId}>
            {visibleEditor ? <div>
                <Editor
                    name='description'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={taskID === taskDetail.taskID ? hitoryEditor : taskDetail.description}
                    init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                // onEditorChange={}
                />
                <button className='btn btn-success my-2' onClick={() => {
                    setvisibleEditor(false)
                    setHitoryEditor(editorRef.current.getContent())

                    dispatch({
                        type: 'HANDLE_CHANGE_POST_API',
                        actionType: 'CHANGE_TASK_MODAL',
                        name: 'description',
                        value: editorRef.current.getContent()
                    })
                }}>Save Change</button>
                <button className='btn btn-danger my-2 ml-2' onClick={() => { setvisibleEditor(false) }}>Cancel</button>
            </div> : <div onClick={() => { setvisibleEditor(!visibleEditor) }}>{jsxDesc}</div>}
        </div>
    }

    const timeTracking = () => {
        const max = Number(taskDetail.timeTrackingSpent) + Number(taskDetail.timeTrackingRemaining)
        const widthTime = Math.round(Number(taskDetail.timeTrackingSpent) / max * 100)
        return <div key={max}>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${widthTime}%` }} aria-valuenow={Number(taskDetail.timeTrackingSpent)} aria-valuemin={Number(taskDetail.timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(taskDetail.timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(taskDetail.timeTrackingRemaining)}h estimated</p>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-6">
                    <input name='timeTrackingSpent' onChange={handleChange} type='number' className='form-control' />
                    <sub>Time Tracking Spent</sub>
                </div>
                <div className='col-6'>
                    <input name='timeTrackingRemaining' onChange={handleChange} type='number' className='form-control' />
                    <sub>Time Tracking Remaining</sub>
                </div>
            </div>
        </div>
    }

    // console.log(taskDetail)

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title d-flex align-items-center flex-column">
                            <div className='d-flex' style={{ alignSelf: 'flex-start' }}>
                                <i className="fa fa-bookmark" style={{ alignSelf: 'center' }} />
                                <h5 className='ml-2 mb-0'>{taskDetail.taskName}</h5>
                            </div>
                            <select name='typeId' className='form-control mt-2' value={taskDetail.typeId} onChange={handleChange}>
                                {arrTaskType.map((item, index) => {
                                    return <option key={index} value={item.typeId}>{item.taskType}</option>
                                })}
                            </select>
                        </div>

                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span className='ml-2' style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span className='ml-2' style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer', alignSelf: 'flex-end' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p>Description</p>
                                        {renderDescription()}
                                    </div>

                                    <div className="comment mt-5">
                                        <h4>Comment</h4>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={JSON.parse(localStorage.getItem(USER_LOGIN)).avatar} alt='1' />
                                            </div>
                                            <div className="input-comment">
                                                <Editor
                                                    name='comment'
                                                    onInit={(evt, editor) => cmtRef.current = editor}
                                                    initialValue={'Add a comment...'}
                                                    init={{
                                                        height: 150,
                                                        menubar: false,
                                                        plugins: [
                                                            'advlist autolink lists link image charmap print preview anchor',
                                                            'searchreplace visualblocks code fullscreen',
                                                            'insertdatetime media table paste code help wordcount'
                                                        ],
                                                        toolbar: 'undo redo | formatselect | ' +
                                                            'bold italic backcolor | alignleft aligncenter ' +
                                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                                            'removeformat | help',
                                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                    }}
                                                // onEditorChange={}
                                                />
                                                <div className='d-flex mt-2 justify-content-end'>
                                                    <button className='btn btn-success mr-2' onClick={() => {
                                                        dispatch({
                                                            type: 'POST_CMT_SAGA',
                                                            cmtContent: {
                                                                "taskId": taskDetail.taskId,
                                                                "contentComment": cmtRef.current.getContent()
                                                            }
                                                        })
                                                    }}>Post</button>
                                                </div>

                                                {/* <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p> */}
                                            </div>
                                        </div>
                                        <div className="lastest-comment mt-3">
                                            {taskDetail.lstComment.length === 0
                                                ? <div className='text-center' style={{ color: '#929398' }}>
                                                    No comments just yet
                                                </div>
                                                : taskDetail.lstComment.map((cmt, index) => {
                                                    // console.log(cmt)
                                                    return <div key={index} className="comment-item border-top pt-2 mb-1">
                                                        <div className="display-comment" style={{ display: 'flex' }}>
                                                            <div className="avatar">
                                                                <img src={cmt.avatar} alt='1' />
                                                            </div>
                                                            <div className='d-flex justify-content-between align-items-center w-100'>
                                                                <div>
                                                                    <h6 className='mb-1'>
                                                                        {cmt.name} <span style={{ fontSize: 10, color: '#929398' }} className='ml-1'>{cmt.idUser === projectDetail.creator.id ? '(Creator)' : '(Member)'}</span>
                                                                    </h6>
                                                                    <div className='mb-1'>
                                                                        {visibleCmtEdit === cmt.id ?
                                                                            <Editor
                                                                                name='comment'
                                                                                onInit={(evt, editor) => cmtEditorRef.current = editor}
                                                                                initialValue={cmt.commentContent}
                                                                                init={{
                                                                                    height: 120,
                                                                                    menubar: false,
                                                                                    plugins: [
                                                                                        'advlist autolink lists link image charmap print preview anchor',
                                                                                        'searchreplace visualblocks code fullscreen',
                                                                                        'insertdatetime media table paste code help wordcount'
                                                                                    ],
                                                                                    toolbar: 'undo redo | formatselect | ' +
                                                                                        'bold italic backcolor | alignleft aligncenter ' +
                                                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                                        'removeformat | help',
                                                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                                                }}
                                                                            // onEditorChange={}
                                                                            />
                                                                            : parse(cmt.commentContent)}
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex align-items-center justify-content-center'>
                                                                    <span style={{ color: '#929398', cursor: 'pointer' }} className='mr-2' onClick={(e) => {
                                                                        setVisibleCmtEdit(cmt.id)
                                                                    }}>{visibleCmtEdit === cmt.id ? '' : 'Edit'}</span>
                                                                    {visibleCmtEdit === cmt.id ?
                                                                        <div className='d-flex flex-column mr-1 text-center'>
                                                                            <span style={{ color: '#929398', cursor:'pointer' }} className='pb-1' onClick={() => {
                                                                                dispatch({
                                                                                    type: 'UPDATE_CMT_SAGA',
                                                                                    id: cmt.id,
                                                                                    cmtContent: cmtEditorRef.current.getContent(),
                                                                                    taskId: taskDetail.taskId
                                                                                })
                                                                                setVisibleCmtEdit(-1)
                                                                            }}>Save</span>
                                                                            <span style={{ color: '#929398', cursor:'pointer' }} className='pt-1 border-top' onClick={() => {
                                                                                setVisibleCmtEdit(-1)
                                                                            }}>Cancel</span>
                                                                        </div>
                                                                        : ''}
                                                                    •
                                                                    <span style={{ color: '#929398', cursor: 'pointer' }} className='ml-2' onClick={() => {
                                                                        dispatch({
                                                                            type: 'DELETE_CMT_SAGA',
                                                                            id: cmt.id,
                                                                            taskId: taskDetail.taskId
                                                                        })
                                                                    }}>Delete</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name='statusId' className="custom-select" value={taskDetail.statusId} onChange={(e) => {
                                            handleChange(e)
                                            // dispatch({
                                            //     type: 'UPDATE_TASK_STATUS_SAGA',
                                            //     taskStatusUpdate: {
                                            //         taskId: taskDetail.taskId,
                                            //         statusId: e.target.value
                                            //     },
                                            //     projectId: taskDetail.projectId
                                            // })
                                        }}>
                                            {arrStatus.map((item, index) => {
                                                return <option key={index} value={item.statusId}>{item.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees" style={{ position: 'relative' }}>
                                        <h6>ASSIGNEES</h6>
                                        <div className='row'>
                                            {taskDetail.assigness.map((item, index) => {
                                                return <div key={index} className='col-6 mt-2'>
                                                    <div key={index} style={{ display: 'flex' }} className="item">
                                                        <div className="avatar">
                                                            <img src={item.avatar} alt={index} />
                                                        </div>
                                                        <p className="name ml-1 d-flex " style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                                                            {item.name.length > 6 ? item.name.slice(0, 6).concat('...') : item.name}
                                                            <DeleteOutlined className='p-1' style={{ cursor: 'pointer' }} onClick={() => {

                                                                dispatch({
                                                                    type: 'HANDLE_CHANGE_POST_API',
                                                                    actionType: 'DELETE_MEMBER',
                                                                    id: item.id
                                                                })

                                                                // dispatch({
                                                                //     type: 'DELETE_MEMBER',
                                                                //     id: item.id
                                                                // })
                                                            }} />
                                                        </p>
                                                    </div>
                                                </div>
                                            })}
                                            <div style={{ cursor: 'pointer' }} className='col-12 my-2 pl-3 pr-0 align-items-center d-flex' onClick={() => {
                                                setRenderSelect(!renderSelect)
                                            }}>
                                                <i className="fa fa-plus ml-1" style={{ marginRight: 5 }} /><span>Add more</span>
                                            </div>
                                            {renderSelect ? <Select
                                                style={{ position: 'absolute', bottom: '-25px' }}
                                                name='lstUser'
                                                placeholder="Select members"
                                                className='ml-3 mt-2 w-100'
                                                onSelect={(value) => {
                                                    let userSelect = projectDetail.members?.find(mem => mem.userId == value)
                                                    userSelect = { ...userSelect, id: userSelect.userId }
                                                    dispatch({
                                                        type: 'HANDLE_CHANGE_POST_API',
                                                        actionType: 'CHANGE_ASSIGNESS',
                                                        userSelect
                                                    })

                                                    // dispatch({
                                                    //     type: 'CHANGE_ASSIGNESS',
                                                    //     userSelect
                                                    // })
                                                }}>
                                                {projectDetail.members?.filter(member => {
                                                    let index = taskDetail.assigness?.findIndex(us => us.id === member.userId)
                                                    if (index !== -1) {
                                                        return false
                                                    } else {
                                                        return true
                                                    }
                                                }).map((item, index) => {
                                                    return <Option key={index} value={item.userId}>{item.name}</Option>
                                                })}
                                            </Select> : ''}
                                        </div>
                                    </div>
                                    {/* <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div style={{ display: 'flex' }} className="item">
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='1' />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                                                <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                            </p>
                                        </div>
                                    </div> */}
                                    <div className="priority" style={{ marginBottom: 20, marginTop: 35 }}>
                                        <h6>PRIORITY</h6>
                                        <select name='priorityId' className='form-control' value={taskDetail.priorityId} onChange={(e) => {
                                            handleChange(e)
                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option value={item.priorityId} key={index}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" name='originalEstimate' className="estimate-hours" value={taskDetail.originalEstimate} onChange={(e) => {
                                            handleChange(e)
                                        }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {timeTracking()}
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
