import { useFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import { login } from "../../redux/auth-reducer"
import { required } from "../../utils/validators/validators"
import { Input } from "../common/FormsControls/FormsControls"

const LoginForm = ({ onSubmit, authError }) => {
  const validate = (values) => {
    const loginError = required(values.login)
    const passError = required(values.password)
    if(loginError || passError)
      return { login : loginError, password: passError }
    return undefined
  }
  const formik = useFormik ({
    initialValues: {
      login: '',
      password: ''
    },
    validate,
    onSubmit: onSubmit
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Input name={'login'} type='text' placeholder={'Login'} formik={formik}  />
      </div>
      <div>
        <Input name={'password'} type='password' placeholder={'Password'} formik={formik}  />
      </div>
      <div>
        <Input name={'rememberMe'} type='checkbox' formik={formik} label='Remember Me'/>
      </div>
      {authError &&
        <div className="loginError">
          {authError}
        </div>
      }
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const Login = (props) => {
  const loginUser = (formData) => {
    let { login, password, rememberMe } = formData
    props.login(login, password, rememberMe)
  }

  if (props.state.isAuth)
    return <Navigate to={'/dashboard'} />

  return <div>
    <h1>LOGIN</h1>
    <LoginForm authError={props.state.authError} onSubmit={loginUser} />
  </div>
}

let mapStateToProps = (state) => ({ state: state.auth })

export default compose(
  connect(mapStateToProps, { login }),
)(Login)