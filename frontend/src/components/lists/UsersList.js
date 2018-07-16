import React from 'react'
import { getUsers } from "../../action-creators/admin-action-creators"
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, } from 'semantic-ui-react'

export default class UsersList extends React.Component {
	state = {	
		data: {},
	}

	getUsers = (params) =>  {
		return getUsers(params).then(data => this.setState({data: data})).catch(err => console.log(err))
	}
    componentDidMount() {
		const params = {
			limit: 10,
			offset: 0
		}
        this.getUsers(params)
    }
	
    render() {
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
			</Table>
		)
	}
}
