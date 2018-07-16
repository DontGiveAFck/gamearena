import React, { Component } from 'react';
import { Segment, Button, Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AddGameForm from '../forms/AddGameForm'
import AddGameToAccountForm from '../forms/AddGameToAccountForm'
import AddGameTypeForm from '../forms/AddGameTypeForm'
import { getGametypes } from "../../action-creators/admin-action-creators"

class List extends Component {
	state = {
		render: '',
		data: [],
		headers: []
	}

	getGametypes = (params) => getGametypes(params).then(data => this.setState({data: data})).catch(err => console.log(err))

    componentDidMount() {
		const params = {
			limit: 10,
			offset: 0
		}
		this.initState()
        this.getGametypes(params)
    }

    initState() {
    	this.setState({
			render: this.props.render,
			headers: this.props.headers
		})
    }

    render() {
		return (
			<Table>
				<TableHeader>
					{ this.state.headers.map((header, id) => <TableHeaderCell key={id}>{header}</TableHeaderCell>) }
				</TableHeader>
				<TableBody>
                    {/*this.state.data.types.map((obj, index) =>
                        <p  key={index}>{obj.Name}</p>
                    )*/console.log(this.state.data.types)}
					<TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>2</TableCell>
					</TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>2</TableCell>
                    </TableRow>
				</TableBody>
			</Table>
		)
	}
}



class AdminPage extends Component {

	state = {
		addGameForm: false,
		addGameToAccountForm: false,
		addGameTypeForm: false,
		setAccountBalanceForm: false,
		setLeaderboardForm: false,
		getGamesList: false,
		getUsersList: false,
		getGametypesList: false
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
					<Button positive disabled name='setAccountBalance' onClick={this.formButtonClick}>Set account balance</Button>
					<Button positive disabled name='setLeaderboard' onClick={this.formButtonClick}>Set leaderboard</Button>
                    <br/> <br/>
					<Button primary name='getGames' onClick={this.getButtonClick}>Get games list</Button>
					<Button primary name='getUsers'>Get users list</Button>
					<Button primary name='getGametypes' onClick={this.getButtonClick}>Get game types list</Button>
                    <br/> <br/>
					<Button negative>Give admin rights to user</Button>
					<Button negative>Remove user</Button>
					<Button negative>Remove game</Button>
					<Button negative>Remove game from account</Button>
				</Segment>
				{this.state.addGameForm && <AddGameForm/>}
				{this.state.addGameToAccountForm && <AddGameToAccountForm/>}
				{this.state.addGameTypeForm && <AddGameTypeForm/>}
				{this.state.getGametypesList && <List render='getGametypes' headers={['type']}/>}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

export default connect(mapStateToProps)(AdminPage)
