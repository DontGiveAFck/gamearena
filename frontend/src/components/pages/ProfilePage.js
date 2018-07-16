import React from 'react'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { Message, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DropForm from '../forms/DropForm'
import { uploadAvatar } from '../../action-creators/user-action-creators'
import GamesList from '../lists/GamesList'

class ProfilePage extends React.Component {
    state = {
        getAllGamesList: false,
        getMyGamesList: false,
        getLeaderboardList: false,
        getLeaderboardByGameList: false,
        getLeaderboardByPlayerList: false,
        addAvatarForm: false
    }
    
    submit = data =>
        this.props.uploadAvatar(data).then(console.log('avatar uploaded'))

    getButtonClick = (e) => {
        const newState = {}
        Object.keys(this.state).forEach((key) => {
            this.state[key] = false
        })
        newState[e.target.name + 'List'] = true
        this.setState(newState)
    }

    formButtonClick = (e) => {
        const newState = {}
        Object.keys(this.state).forEach((key) => {
            this.state[key] = false
        })
        newState[e.target.name + 'Form'] = true
        this.setState(newState)
    }

    render() {
    	const username = jwtDecode(this.props.token).username
    	const admin = jwtDecode(this.props.token).admin

        return (
        	<div>
        		<div><h2>Hello, {username}</h2></div>
				{admin && (<div><Message positive>
                          <Message.Header>Welcome, admin</Message.Header>
                          <p>You can do smth cool in admin panel</p>
                          <Link to='/admin'><Button primary>Admin panel</Button></Link>
                    	  </Message>
                </div>)}

                <Segment>
                    <Button primary name='getAllGames' onClick={this.getButtonClick}>Get all games</Button>
                    <Button primary name='getMyGames' onClick={this.getButtonClick}>Get my games</Button>
                    <Button primary name='getLeaderboard' onClick={this.getButtonClick}>Get leaderboard</Button>
                    <Button primary name='getLeaderboardByGame' onClick={this.getButtonClick}>Get leaderboard by game</Button>
                    <Button primary name='getLeaderboardByPlayer' onClick={this.getButtonClick}>Get leaderboard by player</Button>
                    <br/> <br/>
                    <Button positive name='addAvatar' onClick={this.formButtonClick}>Add avatar</Button>
                </Segment>
                {this.state.getAllGamesList && <GamesList/>}
                {this.state.addAvatarForm && <DropForm submit={this.submit}/>}
        	</div>
        )
    }
}

const mapStateTopProps = (state) => ({
	token: state.user.token
})

export default connect(mapStateTopProps, { uploadAvatar })(ProfilePage)
