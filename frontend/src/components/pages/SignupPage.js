import React from 'react'
import SignupForm from '../forms/SignupForm'
import { connect } from 'react-redux'
import { signup } from '../../action-creators/auth-action-creators'

class SignupPage extends React.Component {
    constructor(props) {
        super(props)
    }

    submit = data =>
        this.props.signup(data)

    render() {
        return (
            <div>
                <h1>Signup page</h1>
                <SignupForm submit={this.submit}/>
            </div>
        )
    }
}

export default connect(null, { signup })(SignupPage)
