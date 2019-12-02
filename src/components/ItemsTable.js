import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'

export const ItemsTable = ({ items }) => {

    const [data, setData] = useState({
        column: "",
        data: "",
        direction: "",
    })

    useEffect(() => {
        if (items.length !== 0) {
            setData(prevState => ({
                ...prevState,
                data: Object.values(items).reduce((result, prev) => result.concat(prev.map(p => ({ type: p.type, author: p.author, title: p.title }))), [])
            }))
        }
    }, [items])

    const handleSort = (clickedColumn, st) => () => {
        const { column, data, direction } = st
        if (column !== clickedColumn) {
            setData({
                column: clickedColumn,
                data: _.sortBy(st.data, clickedColumn),
                direction: 'ascending',
            }
            )
            return
        }
        setData(prevState => ({
            ...prevState,
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        }))

    }
    return (
        <div>
            <Table sortable celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell sorted={data.column === 'type' ? data.direction : null}
                            onClick={handleSort('type', data)}>Type</Table.HeaderCell>
                        <Table.HeaderCell sorted={data.column === 'author' ? data.direction : null}
                            onClick={handleSort('author', data)}>Author</Table.HeaderCell>
                        <Table.HeaderCell sorted={data.column === 'title' ? data.direction : null}
                            onClick={handleSort('title', data)}>Title</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.data.length !== 0 ? data.data.map(item =>
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.type}</Table.Cell>
                            <Table.Cell>{item.author}</Table.Cell>
                            <Table.Cell>{item.title}</Table.Cell>
                        </Table.Row>
                    ) : <Table.Row ><Table.Cell>loading...</Table.Cell></Table.Row>}

                </Table.Body>
            </Table>
        </div>
    )
}