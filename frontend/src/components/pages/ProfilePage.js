import React from 'react'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { Message, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ProfilePage extends React.Component {
    state = {}

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
        	</div>
        )
    }
}

const mapStateTopProps = (state) => ({
	token: state.user.token
})

export default connect(mapStateTopProps)(ProfilePage)
