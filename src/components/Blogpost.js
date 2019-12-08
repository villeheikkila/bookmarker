import React from 'react'
import { Table } from 'semantic-ui-react'

export const Blogpost = ({ blogpost }) => {
    const { author, title, url, tagit, relatedCourses}  = blogpost
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
                    <Table.Cell>{url}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Tags</Table.Cell>
                    <Table.Cell>{tagit && tagit.map(tagi => <p key={tagi}>{tagi}</p>)}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Related courses</Table.Cell>
                    <Table.Cell>{relatedCourses && relatedCourses.map(related => <p key={related}>{related}</p>)}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}