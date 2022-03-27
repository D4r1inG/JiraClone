import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup'
import { connect, useSelector, useDispatch } from 'react-redux';

function CreateProject(props) {

    const arrCategory = useSelector(state => state.ProjectCategoryReducer.arrProject)

    const dispatch = useDispatch()

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
            type: 'GET_ALL_PROJECT_SAGA'
        })
    }, [])
    
    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            setFieldValue('description', editorRef.current.getContent())
        }
    };
    
    return (
        <div className='container mt-5' style={{ paddingLeft: '12%' }}>
            <h3 className='text-center'>Create Project</h3>

            <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    <Editor
                        name='description'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>Write something...</p>"
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
                        onEditorChange={log}
                    />
                </div>
                <div className='form-group'>
                    <select name='categoryId' className='form-control' onChange={handleChange}>
                        {arrCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button type='submit' className='btn btn-outline-primary mb-5'>Create project</button>
            </form>
        </div>
    )

}

const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: parseInt(props.arrProject[0]?.id)
        }
    },

    // Custom sync validation
    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: 'CREATE_PROJECT_SAGA',
            newProject: values
        })
    },

    displayName: 'CreateProjectForm',
})(CreateProject);

const mapStateToProps = (state) => ({ arrProject: state.ProjectCategoryReducer.arrProject })

export default connect(mapStateToProps)(createProjectForm)