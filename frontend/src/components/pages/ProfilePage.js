import React from 'react'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { Message, Button, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import DropForm from '../forms/DropForm'
import GamesList from '../lists/GamesList'
import AccountGamesList from '../lists/AccountGamesList'
import LeaderboardByPlayerList from '../lists/LeaderboardByPlayerList'
import { getAvatar } from '../../action-creators/user-action-creators'

class ProfilePage extends React.Component {
    state = {
        getAllGamesList: false,
        getAccountGamesList: false,
        getLeaderboardList: false,
        getLeaderboardByPlayerList: false,
        addAvatarForm: false,
        avatarExist: false
    }

    componentDidMount() {
        getAvatar().then(res => {
            const base64 = btoa(
                new Uint8Array(res).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            )
            console.log(res)
            return this.setState({ avatarExist: 'data:;base64,' + base64 })
        })
    }

    getButtonClick = (e) => {
        const newState = {}
        Object.keys(this.state).forEach((key) => {
            this.state[key] = false
        })
        newState[e.target.name + 'List'] = true
        console.log(newState)
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
                <br/>
                <Link to='/'><Button>Home page</Button></Link>
                <div>
                    { this.state.avatarExist ? <img src={this.state.avatarExist} alt='avatar'/> : 'No avatar' }
                </div>
                <Segment>
                    <Button primary name='getAllGames' onClick={this.getButtonClick}>Get all games</Button>
                    <Button primary name='getAccountGames' onClick={this.getButtonClick}>Get my games</Button>
                    <Button primary name='getLeaderboardByPlayer' onClick={this.getButtonClick}>Get my scores</Button>
                    <br/> <br/>
                    <Button positive name='addAvatar' onClick={this.formButtonClick}>Add avatar</Button>
                </Segment>
                {this.state.getAllGamesList && <GamesList/>}
                {this.state.addAvatarForm && <DropForm/>}
                {this.state.getAccountGamesList && <AccountGamesList/>}
                {this.state.getLeaderboardByPlayerList && <LeaderboardByPlayerList/>}
        	</div>
        )
    }
}

const mapStateTopProps = (state) => ({
	token: state.user.token
})

export default connect(mapStateTopProps)(ProfilePage)
