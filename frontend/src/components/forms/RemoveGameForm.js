import React from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import { removeGame } from '../../action-creators/admin-action-creators'
import InlineError from '../messages/InlineError'
import Validator from 'validator'

export default class RemoveGameForm extends React.Component {

    state = {
        data: {
            // form data
            gameId: ''
        },
        loading: false,
        errors: {},
        result: ''
    }

    sendData = (data) => removeGame(data).then(data => this.setState({result: data.result}))

    onChange = e => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }
    })

    validate = (data) => {
        const errors = {}
        if (!Validator.isInt(data.gameId)) {
            errors.gameId = 'Game id must be an integer'
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
                    gameId: ''
                }
            })

            this.sendData(this.state.data).catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
        }
    }

    render() {
        const { data, errors, loading, result } = this.state
        return (
            <div>
                <h2>Remove game</h2>
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
                        <label htmlFor='gameId'>Game id</label>
                        <input
                            type='text'
                            id='gameId'
                            name='gameId'
                            placeholder='Enter game ID'
                            value={data.gameId}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.gameId && <InlineError text={errors.gameId}/>} <br/>
                    <Button primary>Remove</Button>
                </Form>
            </div>
        )
    }
}


