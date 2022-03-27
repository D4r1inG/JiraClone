import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import parse from 'html-react-parser';
import { Button, Popconfirm } from 'antd';
import { GET_ALL_PROJECT_SAGA, SET_DISABLED_SUBMIT, SET_SUBMIT_EDIT_PROJECT } from '../../redux/constants/JiraApp/JiraApp';
import { UPDATE_PROJECT_SAGA } from '../../redux/constants/JiraApp/ProjectConstants';


function FormEditProject(props) {

    const arrCategory = useSelector(state => state.ProjectCategoryReducer.arrProject)
    const { submitDisabled } = useSelector(state => state.DrawerJiraAppReducer)
    const editorRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA,
            getUser: false
        })
        dispatch({
            type: SET_SUBMIT_EDIT_PROJECT,
            submitFuction: handleSubmit,
        })
    }, [])

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-6'>
                    <div className='form-group'>
                        <h5>Project ID</h5>
                        <input value={values.id} disabled className='form-control' name='id' />
                    </div>
                </div>

                <div className='col-6'>
                    <div className='form-group'>
                        <h5>Project Name</h5>
                        <input value={values.projectName} className='form-control' name='projectName' onChange={handleChange} />
                    </div>
                </div>

                <div className='col-12'>
                    <div className='form-group'>
                        <h5>Project Category</h5>
                        <select name='categoryId' className='form-control' value={values.categoryId} onChange={handleChange}>
                            {arrCategory.map((item, index) => {
                                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className='col-12'>
                    <div className='form-group'>
                        <h5>Project description</h5>
                        {submitDisabled ?
                            <div>
                                <Editor
                                    name='descriptionPro'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={values.description}
                                    init={{
                                        height: 250,
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
                                />
                                <div className='mt-2'>
                                    <Popconfirm
                                        placement="topRight"
                                        title={"Save changes ?"}
                                        onConfirm={() => {
                                            setFieldValue('description', editorRef.current.getContent()) 
                                            dispatch({
                                                type: SET_DISABLED_SUBMIT,
                                                submitDisabled: false
                                            })
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" onClick={() => { }}>Save</Button>
                                    </Popconfirm>
                                    <Button className='ml-2' danger onClick={() => {
                                        dispatch({
                                            type: SET_DISABLED_SUBMIT,
                                            submitDisabled: false
                                        })
                                    }}>Cancel</Button>
                                </div>
                            </div>
                            : <div style={{cursor: 'pointer'}} onClick={() => {
                                dispatch({
                                    type: SET_DISABLED_SUBMIT,
                                    submitDisabled: true
                                })
                            }}>{parse(values.description)}
                            <sub style={{color: '#929398'}}>(Click to change description)</sub>
                            </div>}
                    </div>
                </div>
            </div>
        </form>
    )
}


const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props
        return {
            id: projectEdit?.id,
            projectName: projectEdit?.projectName,
            description: projectEdit?.description,
            categoryId: projectEdit?.categoryId,
        }
    },

    // Custom sync validation
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values
        })
    },

    displayName: 'CreateProjectForm',
})(FormEditProject);

const mapStateToProps = (state) => ({
    projectEdit: state.ProjectReducer.projectEdit
})

export default connect(mapStateToProps)(editProjectForm)