import React from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
import Validator from 'validator'
import InlineError from '../messages/InlineError'
import {Link} from 'react-router-dom'

class SignupForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                login: '',
                username: '',
                email: '',
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
        if(!Validator.isEmail(data.email)) errors.email = 'Invalid email'
        if(data.login.length > 20 || data.login.length < 5) errors.login = 'Invalid login'
        if(data.username.length > 20 || data.username.length < 5) errors.username = 'Invalid username'
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
        const {data, errors} = this.state

        return (
            <Form className='ui form' onSubmit={this.onSubmit}>
                {errors.result && (
                    <Message negative>
                        <Message.Header>Login error</Message.Header>
                        <p>{errors.result}</p>
                    </Message>
                )}
                <Form.Field className="field" error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id='email'
                        name='email'
                        placeholder='example@example.com'
                        value={data.email}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.email && <InlineError text={errors.email}/>}

                <Form.Field className="field">
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id='login'
                        name='login'
                        placeholder='login'
                        value={data.login}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.login && <InlineError text={errors.login}/>}

                <Form.Field>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id='password'
                        name='password'
                        placeholder='password'
                        value={data.password}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.password && <InlineError text={errors.password}/>}

                <Form.Field>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id='username'
                        name='username'
                        placeholder='username'
                        value={data.username}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.password && <InlineError text={errors.password}/>}
                <br/>
                <Button className='primary'>Sign up</Button>
                <button type='button' className='ui button'><Link to='/'>Home</Link></button>
            </Form>
        )
    }
}

export default SignupForm