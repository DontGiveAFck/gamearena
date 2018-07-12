import React from 'react'
import LoginForm from '../forms/LoginForm'
import { connect } from 'react-redux'
import { login } from '../../action-creators/auth-action-creators'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    }

    submit = data =>
        this.props.login(data).then(() => this.props.history.push('/profile'))

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <LoginForm submit={this.submit}/>
            </div>
        )
    }
}

// first - data from store to component
export default connect(null, { login })(LoginPage)
