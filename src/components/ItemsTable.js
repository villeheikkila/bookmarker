import React from 'react'
import { Table } from 'semantic-ui-react'

export const ItemsTable = ({ items }) => {
    return (
        <div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Author</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.length !== 0 ? Object.keys(items).map(arr => items[arr].length !== 0 ? items[arr].map(item => 
                        <Table.Row key={item.id}> 
                            <Table.Cell>{item.type}</Table.Cell>
                            <Table.Cell>{item.author}</Table.Cell>
                            <Table.Cell>{item.title}</Table.Cell>
                        </Table.Row>
                    ):null): <Table.Row ><Table.Cell>loading...</Table.Cell></Table.Row>}

                </Table.Body>
            </Table>
        </div>
    )
}