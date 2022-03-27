import { LockOutlined, PaperClipOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd'
import { withFormik } from 'formik';
import React from 'react'
import * as yup from 'yup'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

function SignUpJira(props) {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit} className='container' style={{ height: '100%' }} >
            <div style={{ height: '100%' }} className='d-flex justify-content-center align-items-center flex-column mx-5'>
                <h2 className='text-center'>Sign up</h2>
                <Input onChange={handleChange} name='email' size="large" placeholder="Email" prefix={<PaperClipOutlined />} />
                <div className='text-danger '>{errors.email}</div>
                <br />
                <Input onChange={handleChange} name='password' type='password' size="large" placeholder="Password" prefix={<LockOutlined />} />
                <div className='text-danger '>{errors.password}</div>
                <br />
                <Input onChange={handleChange} name='phoneNumber' type='text' size="large" placeholder="Phone number " prefix={<PhoneOutlined />} />
                <div className='text-danger '>{errors.phoneNumber}</div>
                <br />
                <Input onChange={handleChange} name='name' type='name' size="large" placeholder="Name" prefix={<UserOutlined />} />
                <div className='text-danger '>{errors.name}</div>


                <Button htmlType='submit' size='large' shape="round" style={{ width: '100%', backgroundColor: 'rgb(102, 117, 223)', color: '#fff' }} className='mt-4' >Sign up</Button>
                <sub className='mt-2'>Already have an account? <NavLink to="/login">Login</NavLink> </sub>
                <div className='social mt-4' >
                    <Button style={{ backgroundColor: 'rgb(59, 89, 152)' }} shape='circle' size='large'>
                        <i className="fab fa-facebook-f text-white" />
                    </Button>
                    <Button type='primary ml-3' shape='circle' size='large'>
                        <i className="fab fa-twitter" />
                    </Button>
                </div>

            </div>
        </form>
    )
}

const SignUpJiraWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
        phoneNumber: '',
        name: ''
    }),
    validationSchema: yup.object().shape({
        email: yup.string().required('Email is required!').email('Email is invalid!'),
        password: yup.string().min(6, 'Password must have min 6 characters!').max(32, 'Password must have max 32 characters!'),
        phoneNumber: yup.number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(8)
            .required('A phone number is required'),
        name: yup.string().required('User name is required!')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        const {email, password, phoneNumber, name} = values
        props.dispatch({
            type: 'USER_SIGN_UP_SAGA',
            userSignUp: {
                email, password, phoneNumber, name
            }
        })
    },

    displayName: 'Login JiraApp',
})(SignUpJira)

export default connect()(SignUpJiraWithFormik)