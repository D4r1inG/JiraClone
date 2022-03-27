import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { USER_SIGN_IN_API } from '../../../redux/constants/JiraApp/JiraApp';
import { signInAction } from '../../../redux/actions/JiraAppACtion';
import { NavLink } from 'react-router-dom';

function LoginJira(props) {

    //http://casestudy.cyberlearn.vn/swagger

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
                <h2 className='text-center'>Login JiraApp</h2>
                <Input onChange={handleChange} name='email' size="large" placeholder="Email" prefix={<UserOutlined />} />
                <div className='text-danger '>{errors.email}</div>
                <br />
                <Input onChange={handleChange} name='password' type='password' size="large" placeholder="Password" prefix={<LockOutlined />} />
                <div className='text-danger '>{errors.password}</div>

                <div className='d-flex w-100'>
                    <Button htmlType='submit' size='large' shape="round" style={{ width: '100%', backgroundColor: 'rgb(102, 117, 223)', color: '#fff' }} className='mt-4' >Login</Button>
                    <Button size='large' shape="round" style={{ width: '100%', backgroundColor: 'rgb(102, 117, 223)', color: '#fff' }} className='mt-4 ml-2' ><NavLink style={{color: '#fff'}} to="/signup">Sign up</NavLink> </Button>
                </div>
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

const LoginJiraWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: yup.object().shape({
        email: yup.string().required('Email is required!').email('Email is invalid!'),
        password: yup.string().min(6, 'Password must have min 6 characters!').max(32, 'Password must have max 32 characters!')
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(signInAction(values.email, values.password))
    },

    displayName: 'Login JiraApp',
})(LoginJira)

export default connect()(LoginJiraWithFormik)