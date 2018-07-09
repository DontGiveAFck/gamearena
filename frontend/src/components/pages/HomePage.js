import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const HomePage = (props) => {
    return (
        <div>
            <h1>Home Page</h1>
            {props.isAuthenticated ? <button onClick={props.logout}>Logout</button> : <Link to='/login'>Login</Link>}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.user.token
})

export default connect(mapStateToProps, { logout })(HomePage)