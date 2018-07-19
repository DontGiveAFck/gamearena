import React from 'react'
import { Form, Button, Checkbox, Message } from 'semantic-ui-react'
import { addGame } from '../../action-creators/admin-action-creators'
import InlineError from '../messages/InlineError'

class AddGameForm extends React.Component {

    state = {
        data: {
            title: '',
            description: '',
            type: ''
        },
        loading: false,
        gameTypeToggle: false,
        errors: {},
        result: ''
    }

    sendData = (data) => addGame(data).then((data) => this.setState({result: data.result, loading: false}))

    onChange = e => this.setState({
        data: {
            ...this.state.data,
            [e.target.name]: e.target.value
        }
    })

    validate = (data) => {
        const errors = {}

        if (data.title.length > 255 || data.title.length < 1) {
            errors.title = 'Invalid title'
        }
        if (data.description.length > 255 || data.description.length < 1) {
            errors.description = 'Invalid description'
        }
        if (this.state.gameTypeToggle && data.type) {
            if (data.type.length > 255 || data.type.length < 1) {
                errors.type = 'Invalid game type'
            }
        }
        return errors
    }

    onSubmit = (e) => {
        e.preventDefault()
        let errors = this.validate(this.state.data)
        this.setState({ errors, result: '' })

        if (Object.keys(errors).length === 0) {
            this.sendData(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }))

            this.state.gameTypeToggle ?
                this.setState({
                    loading: true,
                    data: {
                        title: '',
                        description: '',
                        type: ''
                    }
                })
                :
                this.setState({
                    loading: true,
                    data: {
                        title: '',
                        description: ''
                    }
                })
        }
    }

    onToggleGameType = (e) => {
        if(e.target.checked) {
            this.setState({
                gameTypeToggle: true
            })
        } else {
            this.setState({
                gameTypeToggle: false
            })
        }
    }

    render() {
        const { data, errors, loading, gameTypeToggle, result } = this.state
        return (
            <div>
                <h2>Add game</h2>
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
                <Form onSubmit={this.onSubmit} loading={loading}>
                    <Form.Field className='field'>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            placeholder='Enter game title'
                            value={data.title}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.title && <InlineError text={errors.title}/>}
                    <Form.Field className='field'>
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            id='description'
                            name='description'
                            placeholder='Enter game description'
                            value={data.description}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    {errors.title && <InlineError text={errors.description}/>} <br/>
                    <div className="ui checkbox">
                        <input type="checkbox" name="gametype" onChange={this.onToggleGameType}/>
                        <label>Game type</label>
                    </div>
                    <Form.Field className='field' disabled={!gameTypeToggle}>
                        <label htmlFor='type'>Type</label>
                        <input
                            type='text'
                            id='type'
                            name='type'
                            placeholder='Enter game type'
                            value={data.type}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Button primary>Add</Button>
                </Form>
            </div>
        )
    }
}

export default AddGameForm
