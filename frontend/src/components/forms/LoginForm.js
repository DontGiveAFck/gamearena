import React from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'
import {Link} from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                login: '',
                password: ''
            },
            loading: false,
            errors: {}
        }
    }

    onChange = e => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }
    })

    validate = (data) => {
        const errors = {}
        if(data.login.length > 20 || data.login.length < 5) errors.login = 'Invalid login'
        if(data.password.length > 50 || data.password.length < 5) errors.password = 'Password too short or too long'
        return errors
    }

    onSubmit = (e) => {
        let errors = this.validate(this.state.data)
        this.setState({ errors })

        if(Object.keys(errors).length === 0) {
            this.setState({ loading: true })
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false}))
        }
    }

    render() {
        const {data, errors, loading} = this.state

        return (
            <Form className='ui form' onSubmit={this.onSubmit} loading={loading}>
                {errors.result && (
                    <Message negative>
                        <Message.Header>Login error</Message.Header>
                        <p>{errors.result}</p>
                    </Message>
                )}
                <Form.Field className="field" error={!!errors.login}>
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id='login'
                        name='login'
                        placeholder='Enter your login'
                        value={data.login}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.login && <InlineError text={errors.login}/>}
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        placeholder='Password also required'
                        value={data.password}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.password && <InlineError text={errors.password}/>} <br/>
                <Button className='primary'>Login</Button>
                <Link to='/'><button type='button' className='ui button'>Home</button></Link>
            </Form>
        )
    }
}

export default LoginForm