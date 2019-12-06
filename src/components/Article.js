import React from 'react'
import { Table } from 'semantic-ui-react'

export const Article = ({ article }) => {
    const { author, title, publisher, date, tags, related } = article
    return (
        <Table inverted celled>
            <Table.Body>
                <Table.Row>
                    <Table.Cell width={3}>Author</Table.Cell>
                    <Table.Cell>{author}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Title</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>URL</Table.Cell>
                    <Table.Cell>{publisher}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Date published</Table.Cell>
                    <Table.Cell>{date}</Table.Cell>
                </Table.Row>


                <Table.Row>
                    <Table.Cell width={3}>Tags</Table.Cell>
                    <Table.Cell>{tags && tags.map(tagi => <p key={tagi}>{tagi}</p>)}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Related courses</Table.Cell>
                    <Table.Cell>{related && related.map(related => <p key={related}>{related}</p>)}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}