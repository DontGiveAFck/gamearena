import React from 'react'
import { getGametypes } from "../../action-creators/admin-action-creators"
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, TableFooter, Menu } from 'semantic-ui-react'

export default class TypesList extends React.Component {
	state = {	
		data: {},
		menuItemsCount: 0
	}

	getGametypes = (params) => {
		return getGametypes(params).then(data => {
			const menuItemsCount = Math.ceil(data.count / params.limit)
			return this.setState({data: data, menuItemsCount: menuItemsCount})
		}).catch(err => console.log(err))
	}
    componentDidMount() {
		const params = {
			limit: 10,
			offset: 0
		}
        this.getGametypes(params)

    }

    handleMenuItemClick = (e, res) => {
		const pageNumber = res.name
        console.log(pageNumber)
		const params = {
			limit: 10,
			offset: pageNumber * 10
		}
		this.getGametypes(params)
	}

    render() {
		let menuItems = []
		for (let i = 0; i < this.state.menuItemsCount; i++) {
			menuItems.push(<Menu.Item onClick={this.handleMenuItemClick} name={i} key={i + 1}>{i + 1}</Menu.Item>)
		}

		return (
			<Table>
				<TableHeader>
					<TableHeaderCell>Types</TableHeaderCell>
				</TableHeader>
				<TableBody>
                    {
                      (this.state.data.types) &&
                        this.state.data.types.map((obj) => {
                        	return (<TableRow> <TableCell>{obj.type}</TableCell> </TableRow>)
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
