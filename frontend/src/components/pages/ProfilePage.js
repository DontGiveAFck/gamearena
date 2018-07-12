import React from 'react'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { Message, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DropForm from '../forms/DropForm'
import { uploadAvatar } from '../../action-creators/user-action-creators'

class ProfilePage extends React.Component {
    state = {}
    
    submit = data =>
        this.props.uploadAvatar(data).then(console.log('avatar uploaded'))

    render() {
    	const username = jwtDecode(this.props.token).username
    	const admin = jwtDecode(this.props.token).admin

        return (
        	<div>
        		<div><h2>Hello, {username}</h2></div>
				{admin && (<div><Message positive>
                          <Message.Header>Welcome, admin</Message.Header>
                          <p>You can do smth cool in admin panel</p>
                    	  </Message>
                <Link to='/admin'><Button primary>Admin panel</Button></Link>
                </div>)}
                <DropForm submit={this.submit}/>
        	</div>
        )
    }
}

const mapStateTopProps = (state) => ({
	token: state.user.token
})

export default connect(mapStateTopProps, { uploadAvatar })(ProfilePage)
