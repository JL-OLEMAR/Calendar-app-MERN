import { useEffect } from 'react'

import { useAuthStore, useForm } from '../../hooks'
import { setErrorToast } from '../../helpers'
import './auth.css'

const INITIAL_STATE_LOGIN = {
  lEmail: '',
  lPassword: ''
}

const INITIAL_STATE_REGISTER = {
  rName: '',
  rEmail: '',
  rPassword: '',
  rPassword2: ''
}

export function Auth () {
  const {
    lEmail,
    lPassword,
    onInputChange: onLoginInputChange
  } = useForm(INITIAL_STATE_LOGIN)

  const {
    rName,
    rEmail,
    rPassword,
    rPassword2,
    onInputChange: onRegisterInputChange
  } = useForm(INITIAL_STATE_REGISTER)

  const { errorMessage, startLogin, startRegister } = useAuthStore()

  useEffect(() => {
    errorMessage && setErrorToast(errorMessage)
  }, [errorMessage])

  const loginSubmit = (evt) => {
    evt.preventDefault()
    startLogin({ email: lEmail, password: lPassword })
  }

  const registerSubmit = (evt) => {
    evt.preventDefault()

    if (rPassword !== rPassword2) {
      setErrorToast("Passwords aren't the same!")
      return
    }
    startRegister({ name: rName, email: rEmail, password: rPassword })
  }

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Sign In</h3>
          <form onSubmit={loginSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Email'
                name='lEmail'
                value={lEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                name='lPassword'
                value={lPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className='d-grid gap-2'>
              <input type='submit' className='btnSubmit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Register</h3>
          <form onSubmit={registerSubmit}>
            <div className='form-group mb-2'>
              <input
                type='text'
                className='form-control'
                placeholder='Name'
                name='rName'
                value={rName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                name='rEmail'
                value={rEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Password'
                name='rPassword'
                value={rPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='form-group mb-2'>
              <input
                type='password'
                className='form-control'
                placeholder='Repeat your password'
                name='rPassword2'
                value={rPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className='d-grid gap-2'>
              <input
                type='submit'
                className='btnSubmit'
                value='Create account'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
