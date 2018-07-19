import React from 'react'
import {Form, Button, Message} from 'semantic-ui-react'
import { addGameType } from "../../action-creators/admin-action-creators"
import InlineError from '../messages/InlineError'

export default class AddGameTypeForm extends React.Component {

    state = {
        data: {
            // form data
            type: ''
        },
        loading: false,
        errors: {},
        result: ''
    }

    sendData = (data) => addGameType(data).then(data => this.setState({result: data.result}))

    onChange = e => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }
    })

    validate = (data) => {
        const errors = {}
        if (data.type.length < 1 || data.type.length > 255) {
            errors.type = 'type too long/short'
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
                    type: ''
                }
            })
        }
    }

    render() {
        const { data, errors, loading, result } = this.state
        return (
            <div>
                <h2>Add game type</h2>
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
                        <label htmlFor='type'>Game type</label>
                        <input
                            type='text'
                            id='type'
                            name='type'
                            placeholder='Enter game type'
                            value={data.type}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.type && <InlineError text={errors.type}/>} <br/>
                    <Button primary>Add</Button>
                </Form>
            </div>
        )
    }
}
