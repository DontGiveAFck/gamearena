import React from 'react'
import { getGametypes } from "../../action-creators/admin-action-creators"
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell, TableRow, } from 'semantic-ui-react'

export default class TypesList extends React.Component {
	state = {	
		data: {},
		headers: ['type']
	}

	getGametypes = (params) =>  {
		return getGametypes(params).then(data => this.setState({data: data})).catch(err => console.log(err))
	}
    componentDidMount() {
		const params = {
			limit: 10,
			offset: 0
		}
        this.getGametypes(params)
    }
	
    render() {
		return (
			<Table>
				<TableHeader>
					<TableHeaderCell>Types</TableHeaderCell>
				</TableHeader>
				<TableBody>
                    {
                      (this.state.data.types) &&
                        this.state.data.types.map((obj) => {
                                return (<TableRow>
                                    <TableCell>{obj.type}</TableCell>
                                </TableRow>)

                      })
                    }
        </TableBody>
			</Table>
		)
	}
}
