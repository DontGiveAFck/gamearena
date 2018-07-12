import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import jwtDecode from 'jwt-decode'

const adminCheck = (token) => {
	console.log(jwtDecode(token).admin)
	return !!jwtDecode(token).admin
} 

const AdminRoute = ({ token, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => !adminCheck(token) ? <Component {...props}/> : <Redirect to='/admin' />} />
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps)(AdminRoute)
