import React from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import validator from 'validator'
import { addGameToAccount } from '../../action-creators/admin-action-creators'
import InlineError from '../messages/InlineError'

class AddGameToAccountForm extends React.Component {

    state = {
        data: {
            // form data
            gameId: '',
            accountId: ''
        },
        loading: false,
        errors: {},
        result: ''
    }

    sendData = (data) => addGameToAccount(data).then((data) => this.setState({result: data.result}))

    onChange = e => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }
    })

    validate = (data) => {
        const errors = {}
        if (!validator.isInt(data.accountId)) {
            errors.accountId = 'Account id should has an integer type'
        }
        if (!validator.isInt(data.gameId)) {
            errors.gameId = 'Game id should has an integer type'
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
                   gameId: '',
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
                <h2>Add game to account</h2>
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
                        <label htmlFor='gameid'>Game id</label>
                        <input
                            type='text'
                            id='gameid'
                            name='gameId'
                            placeholder='Enter game id'
                            value={data.gameId}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.gameId && <InlineError text={errors.gameId}/>} <br/>
                    <Form.Field className='field'>
                        <label htmlFor='accountid'>Account id</label>
                        <input
                            type='text'
                            id='accountid'
                            name='accountId'
                            placeholder='Enter account id'
                            value={data.accountId}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.accountId && <InlineError text={errors.accountId}/>} <br/>
                    <Button primary>Add</Button>
                </Form>
            </div>
        )
    }
}

export default AddGameToAccountForm
