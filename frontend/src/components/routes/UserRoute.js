import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const UserRoute = ({ isAuthenticated, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => isAuthenticated ? <Component {...props}/> : <Redirect to='/' />} />
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(UserRoute)
