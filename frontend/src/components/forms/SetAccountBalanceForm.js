import React from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import { setAccountBalance } from '../../action-creators/admin-action-creators'
import InlineError from '../messages/InlineError'
import Validator from 'validator'

export default class SetAccountBalanceForm extends React.Component {

    state = {
        data: {
            // form data
            accountId: '',
            newBalance: ''
        },
        loading: false,
        errors: {},
        result: ''
    }

    sendData = (data) => setAccountBalance(data).then(data => this.setState({result: data.result}))

    onChange = e => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }
    })

    validate = (data) => {
        const errors = {}
        if (!Validator.isInt(data.newBalance)) {
            errors.newBalance = 'Balance must be an integer'
        }
        if (!Validator.isInt(data.accountId)) {
            errors.accountId = 'Account id must be an integer'
        }
        return errors
    }

    onSubmit = (e) => {
        e.preventDefault()
        let errors = this.validate(this.state.data)
        this.setState({ errors })

        if (Object.keys(errors).length === 0) {
            this.setState({
                loading: true,
                data: {
                    newBalance: '',
                    accountId: ''
                }
            })

            this.sendData(this.state.data).catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
        }
    }

    render() {
        const { data, errors, loading, result } = this.state
        return (
            <div>
                <h2>Set account balance</h2>
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
                        <label htmlFor='accountId'>Account ID</label>
                        <input
                            type='text'
                            id='accountId'
                            name='accountId'
                            placeholder='Enter account ID'
                            value={data.accountId}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.accountId && <InlineError text={errors.accountId}/>} <br/>
                    <Form.Field className='field'>
                        <label htmlFor='newBalance'>New balance</label>
                        <input
                            type='text'
                            id='newBalance'
                            name='newBalance'
                            placeholder='Enter new balance'
                            value={data.newBalance}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.newBalance && <InlineError text={errors.newBalance}/>} <br/>

                    <Button primary>Set</Button>
                </Form>
            </div>
        )
    }
}


