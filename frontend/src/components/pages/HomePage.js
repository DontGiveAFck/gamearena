import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../action-creators/auth-action-creators'
import { Button } from 'semantic-ui-react'

const LoggedIn = (props) => {
    return (
        <div>
            <Button onClick={props.logout}>Logout</Button>
            <Link to='/profile'><Button>Profile</Button></Link>
        </div>
    )
}

const LoggedOut = () => {
    return (
        <div>
            <Link to='/login'><Button>Login</Button></Link>
            <Link to='/signup'><Button>Signup</Button></Link>
        </div>
    )
}

const HomePage = (props) => {
    return (
        <div>
            <h1>Home Page</h1>
            {props.isAuthenticated ? <LoggedIn logout={props.logout} /> : <LoggedOut />}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.user.token
})

export default connect(mapStateToProps, { logout })(HomePage)
