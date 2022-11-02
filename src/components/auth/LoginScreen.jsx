import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { useForm } from '../../hooks/useForm.js'
import { startLogin, startRegister } from '../../actions/auth.js'
import './login.css'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: ''
  })

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: '',
    rEmail: '',
    rPassword1: '',
    rPassword2: ''
  })

  const { lEmail, lPassword } = formLoginValues
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(lEmail, lPassword))
  }

  const handleRegisterUser = (e) => {
    e.preventDefault()
    if (rPassword1 !== rPassword2) {
      return Swal.fire('error', 'Las contraseñas deben de ser iguales', 'error')
    }
    dispatch(startRegister(rEmail, rPassword1, rName))
  }

  return (
    <div className='container login-container'>
      <div className='row'>
        <div className='col-md-6 login-form-1'>
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <input
                className='form-control'
                name='lEmail'
                placeholder='Correo'
                type='text'
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                name='lPassword'
                placeholder='Contraseña'
                type='password'
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className='form-group'>
              <input className='btnSubmit' type='submit' value='Login' />
            </div>
          </form>
        </div>

        <div className='col-md-6 login-form-2'>
          <h3>Registro</h3>
          <form onSubmit={handleRegisterUser}>
            <div className='form-group'>
              <input
                className='form-control'
                name='rName'
                placeholder='Nombre'
                type='text'
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                name='rEmail'
                placeholder='Correo'
                type='email'
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className='form-group'>
              <input
                className='form-control'
                name='rPassword1'
                placeholder='Contraseña'
                type='password'
                value={rPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className='form-group'>
              <input
                className='form-control'
                name='rPassword2'
                placeholder='Repita la contraseña'
                type='password'
                value={rPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className='form-group'>
              <input className='btnSubmit' type='submit' value='Crear cuenta' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
