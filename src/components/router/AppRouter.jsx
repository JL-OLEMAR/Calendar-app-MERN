import { useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { startChecking } from '../../actions/auth.js'
import { LoginScreen } from '../auth'
import { CalendarScreen } from '../calendar'

import { PrivateRoute } from './PrivateRoute.jsx'
import { PublicRoute } from './PublicRoute.jsx'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const { checking, uid } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if (checking) {
    return <h5>Espere...</h5>
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            component={LoginScreen}
            isAuthenticated={!!uid}
            path='/login'
          />

          <PrivateRoute
            exact
            component={CalendarScreen}
            isAuthenticated={!!uid}
            path='/'
          />

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}
