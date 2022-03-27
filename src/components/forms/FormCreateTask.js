import { Editor } from '@tinymce/tinymce-react'
import { Select, Slider } from 'antd';
import { Option } from 'antd/lib/mentions';
import { withFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_SAGA } from '../../redux/constants/JiraApp/JiraApp';
import { GET_ALL_PRIORITY_SAGA } from '../../redux/constants/JiraApp/PriorityConstant';
import { GET_ALL_TASK_TYPE_SAGA } from '../../redux/constants/JiraApp/TaskTypeConstant';
import * as Yup from 'yup'
import { GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_SAGA } from '../../redux/constants/JiraApp/UserConstant';

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
}

function FormCreateTask(props) {

    const editorRef = useRef(null);

    const dispatch = useDispatch()

    const { arrProject } = useSelector(state => state.JiraAppProjectReducer)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const { arrPriority } = useSelector(state => state.PiorityReducer)
    const { arrUser } = useSelector(state => state.UserJiraAppReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)

    const userOption = arrUser.map((item, index) => {
        return { label: item.name, value: item.userId }
    })

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_ALL_PRIORITY_SAGA
        })
        dispatch({
            type: 'GET_USER_SAGA',
            keyword: ''
        })
        dispatch({
            type: 'GET_ALL_STATUS_SAGA',
        })
        dispatch({
            type: 'SET_SUBMIT_CREATE_TASK',
            submitFuction: handleSubmit
        })
    }, [])

    const log = () => {
        if (editorRef.current) {
            setFieldValue('description', editorRef.current.getContent())
        }
    };

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    return (
        <form onSubmit={handleSubmit} className='container'>
            <div className='form-group'>
                <p>Project</p>
                <select name='projectId' className='form-control' onChange={(e) => {
                    let value = e.target.value
                    setFieldValue('projectId', value)
                    dispatch({
                        type: GET_USER_BY_PROJECT_SAGA,
                        projectId: value
                    })
                }} >
                    {arrProject.map((item, index) => {
                        return <option key={index} value={item.id}>
                            {item.projectName}
                        </option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Task Name</p>
                        <input name='taskName' onChange={handleChange} className='form-control' />
                    </div>
                    <div className='col-6'>
                        <p>Status</p>
                        <select name='statusId' onChange={handleChange} className='form-control' >
                            {arrStatus.map((item, index) => {
                                return <option key={index} value={item.statusId}>
                                    {item.statusName}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group mt-1'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select className='form-control' name='typeId' onChange={handleChange}>
                            {arrTaskType.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.taskType}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Priority</p>
                        <select className='form-control' name='priorityId' onChange={handleChange}>
                            {arrPriority.map((item, index) => {
                                return <option key={index} value={item.priorityId}>
                                    {item.priority}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={'default'}
                            placeholder="Please select"
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values)
                            }}
                            optionFilterProp='label'
                            options={userOption}
                            onSearch={(value) => { }}
                            style={{ width: '100%' }}
                        >

                        </Select>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <p>Original Estimate</p>
                                <input name='originalEstimate' onChange={handleChange} type='number' defaultValue='0' min='0' className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='col-6' >
                        <p>Time tracking</p>
                        <Slider className='pt-3' defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className='d-flex justify-content-between'>
                            <sub className='font-weight-bold'>{timeTracking.timeTrackingSpent}h Logged</sub>
                            <sub className='font-weight-bold'>{timeTracking.timeTrackingRemaining}h remaining</sub>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6'>
                                <p>Time spent</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingSpent' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    })
                                    setFieldValue('timeTrackingSpent', e.target.value)
                                }} />
                            </div>
                            <div className='col-6'>
                                <p>Time remaining</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
                                    setFieldValue('timeTrackingRemaining', e.target.value)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group mt-1'>
                <p>Description</p>
                <Editor
                    name='description'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>Write something...</p>"
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
                    onEditorChange={log}
                />
            </div>
        </form>
    )
}

const frmCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        const { arrProject, arrTaskType, arrPriority, arrStatus } = props

        // if(arrProject.length > 0){
        //     props.dispatch({
        //         type: GET_USER_BY_PROJECT_SAGA,
        //         projectId: arrProject[0]?.id
        //     })
        // }

        return {
            listUserAsign: [],
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId
        }
    },

    // Custom sync validation
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: 'CREATE_TASK_SAGA',
            taskObj: values
        })
    },

    displayName: 'CreateTaskForm',
})(FormCreateTask);

// const { arrProject } = useSelector(state => state.JiraAppProjectReducer)
// const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
// const { arrPriority } = useSelector(state => state.PiorityReducer)
// const { userSearch } = useSelector(state => state.UserJiraAppReducer)
// const { arrStatus } = useSelector(state => state.StatusReducer)


const mapStateToProps = (state) => (
    {
        arrProject: state.JiraAppProjectReducer.arrProject,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PiorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus,
    }
)


export default connect(mapStateToProps)(frmCreateTask)