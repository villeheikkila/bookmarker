import React from 'react';
import { Table } from 'semantic-ui-react';

export const Book = ({ book }) => {
    const { author, title, isbn, tags, related, year } = book;
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
                    <Table.Cell width={3}>ISBN</Table.Cell>
                    <Table.Cell>{isbn}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Tags</Table.Cell>
                    <Table.Cell>{tags}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Year</Table.Cell>
                    <Table.Cell>{year}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Related courses</Table.Cell>
                    <Table.Cell>{related}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}