import React from 'react'
import { getLeaderboardByPlayer } from '../../action-creators/user-action-creators'
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, TableFooter, Menu } from 'semantic-ui-react'

export default class GamesList extends React.Component {
	state = {	
		data: {},
        menuItemsCount: 0
    }

	getLeaderboardByPlayer = (params) => {
		return getLeaderboardByPlayer(params).then(data => {
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
        this.getLeaderboardByPlayer(params)
    }

    handleMenuItemClick = (e, res) => {
        const pageNumber = res.name
        console.log(pageNumber)
        const params = {
            limit: 10,
            offset: pageNumber * 10
        }
        this.getLeaderboardByPlayer(params)
    }
	
    render() {
        let menuItems = []
        for (let i = 0; i < this.state.menuItemsCount; i++) {
            menuItems.push(<Menu.Item onClick={this.handleMenuItemClick} name={i} key={i + 1}>{i + 1}</Menu.Item>)
        }
    	console.log(this.state.data)
		return (
			<Table>
				<TableHeader>
					<TableHeaderCell>Game ID</TableHeaderCell>
					<TableHeaderCell>Score</TableHeaderCell>
				</TableHeader>
				<TableBody>
                    {
                      (this.state.data.count) &&
					  this.state.data.leaderboards.map((obj) => {
							return (<TableRow>
								<TableCell>{obj.gameid}</TableCell>
								<TableCell>{obj.score}</TableCell>
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
		)
	}
}
