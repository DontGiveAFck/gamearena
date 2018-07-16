import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AddGameForm from '../forms/AddGameForm'
import AddGameToAccountForm from '../forms/AddGameToAccountForm'
import AddGameTypeForm from '../forms/AddGameTypeForm'
import TypesList from '../lists/TypesList'
import UsersList from '../lists/UsersList'
import GiveAdminRightsForm from '../forms/GiveAdminRightsForm'
import RemoveUserForm from '../forms/RemoveUserForm'
import RemoveGameForm from '../forms/RemoveGameForm'
import RemoveGameFromAccountForm from '../forms/RemoveGameFromAccountForm'
import SetAccountBalanceForm from '../forms/SetAccountBalanceForm'
import SetLeaderboardForm from '../forms/SetLeaderboardForm'

class AdminPage extends Component {

	state = {
		addGameForm: false,
		addGameToAccountForm: false,
		addGameTypeForm: false,
		setAccountBalanceForm: false,
		setLeaderboardForm: false,
		getUsersList: false,
		getGametypesList: false,
		giveAdminRightsForm: false,
		removeUserForm: false,
		removeGameForm: false,
		removeGameFromAccountForm: false
	}

	formButtonClick = (e) => {
		const newState = {}
		Object.keys(this.state).forEach((key) => {
			this.state[key] = false
		})
        newState[e.target.name + 'Form'] = true
        this.setState(newState)
    }

    getButtonClick = (e) => {
        const newState = {}
        Object.keys(this.state).forEach((key) => {
            this.state[key] = false
        })
        newState[e.target.name + 'List'] = true
        this.setState(newState)
	}

	render() {
		return (
			<div>
				<h1>Admin panel</h1>
				<Segment>
					<Button positive name='addGame' onClick={this.formButtonClick}>Add game</Button>
					<Button positive name='addGameToAccount' onClick={this.formButtonClick}>Add game to account</Button>
					<Button positive name='addGameType' onClick={this.formButtonClick}>Add game type</Button>
					<Button positive name='setAccountBalance' onClick={this.formButtonClick}>Set account balance</Button>
					<Button positive name='setLeaderboard' onClick={this.formButtonClick}>Set leaderboard</Button>
                    <br/> <br/>
					<Button primary name='getUsers' onClick={this.getButtonClick}>Get users list</Button>
					<Button primary name='getGametypes' onClick={this.getButtonClick}>Get game types list</Button>
                    <br/> <br/>
					<Button negative name='giveAdminRights' onClick={this.formButtonClick}>Give admin rights to user</Button>
					<Button negative name='removeUser' onClick={this.formButtonClick}>Remove user</Button>
					<Button negative name='removeGame' onClick={this.formButtonClick}>Remove game</Button>
					<Button negative name='removeGameFromAccount' onClick={this.formButtonClick}>Remove game from account</Button>
				</Segment>
				{this.state.addGameForm && <AddGameForm/>}
				{this.state.addGameToAccountForm && <AddGameToAccountForm/>}
				{this.state.addGameTypeForm && <AddGameTypeForm/>}
				{this.state.getGametypesList && <TypesList/>}
				{this.state.getUsersList && <UsersList/>}
				{this.state.giveAdminRightsForm && <GiveAdminRightsForm/>}
				{this.state.removeUserForm && <RemoveUserForm/>}
				{this.state.removeGameForm && <RemoveGameForm/>}
				{this.state.removeGameFromAccountForm && <RemoveGameFromAccountForm/>}
				{this.state.setAccountBalanceForm && <SetAccountBalanceForm/>}
				{this.state.setLeaderboardForm && <SetLeaderboardForm/>}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

export default connect(mapStateToProps)(AdminPage)
