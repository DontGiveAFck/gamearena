import React from 'react'
import { getGames } from '../../action-creators/user-action-creators'
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, TableFooter, Menu, Button } from 'semantic-ui-react'
import LeaderboardByGameList from './LeaderboardByGameList'

export default class GamesList extends React.Component {
	state = {	
		data: {},
        menuItemsCount: 0,
        leaderboard: 0,
        clearleaderboard: 0
    }
	
	getGames = (params) => {
		return getGames(params).then(data => {
            const menuItemsCount = Math.ceil(data.count / params.limit)
			return this.setState({
				menuItemsCount: menuItemsCount,
				data: data
			})})
			.catch(err => console.log(err))
	}
    componentDidMount() {
		const params = {
			limit: 10,
			offset: 0
		}
        this.getGames(params)
    }

    handleMenuItemClick = (e, res) => {
        const pageNumber = res.name
        const params = {
            limit: 10,
            offset: pageNumber * 10
        }
        this.getGames(params)
    }


    getLeaderboardByGame = (e) => {
	    this.setState({
			leaderboard: e.target.name
		})
        console.log(this.state.leaderboard)

    }
    closeLeaderboard = () => {
        this.setState({
            leaderboard: 0
        })
    }
    render() {
        let menuItems = []
        for (let i = 0; i < this.state.menuItemsCount; i++) {
            menuItems.push(<Menu.Item onClick={this.handleMenuItemClick} name={i} key={i + 1}>{i + 1}</Menu.Item>)
        }
    	console.log(this.state.data)
		return (
			<div>
				<Table>
				<TableHeader>
					<TableHeaderCell>ID</TableHeaderCell>
					<TableHeaderCell>Title</TableHeaderCell>
					<TableHeaderCell>Description</TableHeaderCell>
					<TableHeaderCell>Type</TableHeaderCell>
					<TableHeaderCell>Status</TableHeaderCell>
					<TableHeaderCell>Leaderboard</TableHeaderCell>
				</TableHeader>
				<TableBody>
                    {
                      (this.state.data.count) && 
					  this.state.data.games.map((obj) => {
							return (<TableRow>
								<TableCell>{obj.id}</TableCell>
								<TableCell>{obj.title}</TableCell>
								<TableCell>{obj.description}</TableCell>
								<TableCell>{obj.type}</TableCell>
								<TableCell>{obj.status}</TableCell>
								<TableCell><Button disabled={!!this.state.leaderboard} onClick={this.getLeaderboardByGame} name={obj.id}>Leaderboard</Button></TableCell>
							</TableRow>)
					  })
                    }
        		</TableBody>
                <TableFooter>
                    <TableRow>
                        <Menu pagination>
                            {menuItems}
                        </Menu>
                    </TableRow>
                </TableFooter>
				</Table>
				<br/> <br/>
                {!!this.state.leaderboard && <Button negative onClick={this.closeLeaderboard}>Close leaderboard</Button>}
				{!!this.state.leaderboard && <LeaderboardByGameList gameid={this.state.leaderboard}/>}
			</div>
		)
	}
}
