import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './components/useAuth'

const ProtectedRoutes = ({component: Component, ...rest}) => {

    return (
        <Route 
        {...rest} 
        render={(props) => {
            if (auth.isAuthenticated()) return <Component {...props} />
            if (!auth.isAuthenticated()) return <Redirect to={{path:"/login", state:{from:props.location}}}/>
        }}/>
    )
}

export default ProtectedRoutes;