import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { uploadAvatar } from '../../action-creators/user-action-creators'

export default class DropForm extends Component {
	state = {
		result: '',
		errors: ''
	}
	form = new FormData()
	onDrop = (files) => {
		this.form.append('avatar', files[0])
		console.log('files', this.form.getAll('avatar'))
	}
	onSubmit = () => {
		this.setState({
			result: '',
            errors: ''
		})
		console.log('files ', this.form.get)
		uploadAvatar(this.form)
			.then(data => this.setState({ result: data.result }))
			.catch(err => this.setState({ errors: err.response.data.errors }))
        this.form = new FormData()
	}
	render() {
		return (
			<div>
                {this.state.result && (
                    <Message positive>
                        <Message.Header>Result</Message.Header>
                        <p>{this.state.result}</p>
                    </Message>
                )}
                {this.state.errors && (
                    <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>{this.state.errors}</p>
                    </Message>
                )}
				<Form onSubmit={this.onSubmit}>
					 <Form.Field className='field'>
                         <Dropzone onDrop={this.onDrop} accept='image/jpeg, image/png'>
                   			 <p>Drop your avatar here (jpeg or png)</p>
               			 </Dropzone>
                	 </Form.Field>
                	 <Button positive>Send avatar</Button>
				</Form>
			</div>
		)
	}
}
