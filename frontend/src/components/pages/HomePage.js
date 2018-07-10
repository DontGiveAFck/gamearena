import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import { Button } from 'semantic-ui-react'

const HomePage = (props) => {
    return (
        <div>
            <h1>Home Page</h1>
            {props.isAuthenticated ? <button onClick={props.logout}>Logout</button> : <Button primaty><Link to='/login'>Login</Link></Button>} 
            {!props.isAuthenticated && <Button primaty><Link to='/signup'>Signup</Link></Button>}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.user.token
})

export default connect(mapStateToProps, { logout })(HomePage)