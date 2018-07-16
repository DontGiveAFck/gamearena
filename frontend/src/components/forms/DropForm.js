import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

export default class DropForm extends Component {
	form = new FormData()
	onDrop = (files) => {
		this.form.append('avatar', files[0])
		console.log('files', this.form.getAll('avatar'))
	}
	onSubmit = () => {
		console.log('files ', this.form.get)
		this.props
            .submit(this.form)
            .catch(err => console.log(err))
	}
	render() {
		return (
			<div>
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
