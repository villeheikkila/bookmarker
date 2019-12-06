import React from 'react'
import { Table } from 'semantic-ui-react'

export const Blogpost = ({ blogpost }) => {
    const { author, title, url, tags, related}  = blogpost
    return (
        <Table definition>
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
                    <Table.Cell>{url}</Table.Cell>
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