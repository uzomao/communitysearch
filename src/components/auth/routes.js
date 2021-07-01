import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { supabase } from '../../App'

export const PrivateRoute = ({ children, ...rest }) => {

    const session = supabase.auth.session()

    return (
        <Route {...rest} render={() => {
            return session ?
                children
                :
                <Redirect to='/login' />
        }}>
        </Route>
    )
}

export const AuthRoute = ({ children, ...rest }) => {

    const session = supabase.auth.session()

    return (
        <Route {...rest} render={() => {
            return session ?
                <Redirect to='/' />
                :
                children
        }}>
        </Route>
    )

}
