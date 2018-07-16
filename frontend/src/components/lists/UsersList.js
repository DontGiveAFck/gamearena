import React from 'react'
import { getUsers } from "../../action-creators/admin-action-creators"
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, TableFooter, Menu } from 'semantic-ui-react'

export default class UsersList extends React.Component {
	state = {	
		data: {},
        menuItemsCount: 0
	}

	getUsers = (params) =>  {
		return getUsers(params).then(data => {
            const menuItemsCount = Math.ceil(data.count / params.limit)
            return this.setState({data: data, menuItemsCount: menuItemsCount})
		})
			.catch(err => console.log(err))
	}
    componentDidMount() {
		const params = {
			limit: 10,
			offset: 0
		}
        this.getUsers(params)
    }

    handleMenuItemClick = (e, res) => {
        const pageNumber = res.name
        console.log(pageNumber)
        const params = {
            limit: 10,
            offset: pageNumber * 10
        }
        this.getUsers(params)
    }
	
    render() {
        let menuItems = []
        for (let i = 0; i < this.state.menuItemsCount; i++) {
            menuItems.push(<Menu.Item onClick={this.handleMenuItemClick} name={i} key={i + 1}>{i + 1}</Menu.Item>)
        }

        return (
			<Table>
				<TableHeader>
					<TableHeaderCell>ID</TableHeaderCell>
					<TableHeaderCell>Login</TableHeaderCell>
					<TableHeaderCell>E-mail</TableHeaderCell>
					<TableHeaderCell>Username</TableHeaderCell>
					<TableHeaderCell>Admin</TableHeaderCell>
					<TableHeaderCell>Status</TableHeaderCell>
				</TableHeader>
				<TableBody>
                    {
                      (this.state.data.count) && 
					  this.state.data.users.map((obj) => {
							return (<TableRow>
								<TableCell>{obj.id}</TableCell>
								<TableCell>{obj.login}</TableCell>
								<TableCell>{obj.email}</TableCell>
								<TableCell>{obj.username}</TableCell>
								<TableCell>{obj.admin.toString()}</TableCell>
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
