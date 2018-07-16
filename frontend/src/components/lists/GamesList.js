import React from 'react'
import { getGames } from "../../action-creators/admin-action-creators"
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, } from 'semantic-ui-react'

export default class GamesList extends React.Component {
	state = {	
		data: {},
	}

	getGames = (params) =>  {
		return getGames(params).then(data => this.setState({data: data})).catch(err => console.log(err))
	}
    componentDidMount() {
		const params = {
			limit: 10,
			offset: 0
		}
        this.getGames(params)
    }
	
    render() {
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
			</Table>
		)
	}
}
