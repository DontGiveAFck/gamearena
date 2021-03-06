import React from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import { giveAdminRights } from "../../action-creators/admin-action-creators"
import InlineError from '../messages/InlineError'
import Validator from 'validator'

export default class GiveAdminRights extends React.Component {

    state = {
        data: {
            // form data
            userId: '',
        },
        loading: false,
        errors: {},
        result: ''
    }

    sendData = (data) => giveAdminRights(data).then(data => this.setState({result: data.result}))

    onChange = e => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }
    })

    validate = (data) => {
        const errors = {}
        if (!Validator.isInt(data.userId)) {
            errors.userId = 'User id must be an integer'
        }
        return errors
    }

    onSubmit = (e) => {
        e.preventDefault()
        let errors = this.validate(this.state.data)
        this.setState({ errors, result: '' })

        if (Object.keys(errors).length === 0) {
            this.sendData(this.state.data).catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
            this.setState({
                loading: true,
                data: {
                    userId: ''
                }
            })
        }
    }

    render() {
        const { data, errors, loading, result } = this.state
        return (
            <div>
                <h2>Give admin rights to the user</h2>
                <Form onSubmit={this.onSubmit}>
                    {errors.result && (
                        <Message negative>
                            <Message.Header>Can't do it :(</Message.Header>
                            <p>{errors.result}</p>
                        </Message>
                    )}
                    {result && (
                        <Message positive>
                            <Message.Header>Result</Message.Header>
                            <p>{result}</p>
                        </Message>
                    )}
                    <Form.Field className='field'>
                        <label htmlFor='userId'>User id</label>
                        <input
                            type='text'
                            id='userId'
                            name='userId'
                            placeholder='Enter user ID'
                            value={data.userId}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.userId && <InlineError text={errors.userId}/>} <br/>
                    <Button primary>Give</Button>
                </Form>
            </div>
        )
    }
}


