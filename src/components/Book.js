import React from 'react';
import { Table } from 'semantic-ui-react';

export const Book = ({ book }) => {
    const { kirjoittaja, otsikko, isbn, tagit, related } = book;
    return (
        <Table definition>
            <Table.Body>
                <Table.Row>
                    <Table.Cell width={3}>Kirjoittaja</Table.Cell>
                    <Table.Cell>{kirjoittaja}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Otsikko</Table.Cell>
                    <Table.Cell>{otsikko}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>ISBN</Table.Cell>
                    <Table.Cell>{isbn}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Tagit</Table.Cell>
                    <Table.Cell>{tagit.map(tagi => <p key={tagi}>{tagi}</p>)}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Vastaavat kurssit</Table.Cell>
                    <Table.Cell>{related.map(related => <p key={related}>{related}</p>)}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>

    )

}