import React from 'react'
import { getGames } from '../../action-creators/admin-action-creators'
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, TableFooter, Menu } from 'semantic-ui-react'

export default class GamesList extends React.Component {
	state = {	
		data: {},
        menuItemsCount: 0
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
        console.log(pageNumber)
        const params = {
            limit: 10,
            offset: pageNumber * 10
        }
        this.getGames(params)
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
					<TableHeaderCell>ID</TableHeaderCell>
					<TableHeaderCell>Title</TableHeaderCell>
					<TableHeaderCell>Description</TableHeaderCell>
					<TableHeaderCell>Type</TableHeaderCell>
					<TableHeaderCell>Status</TableHeaderCell>
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
