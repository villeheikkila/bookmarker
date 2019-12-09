import React, { useContext } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { ItemServiceContext } from '../App';

export const Article = ({ article }) => {
    const { id, author, title, publisher, localDate, tagit, related } = article
    const { itemService } = useContext(ItemServiceContext)
    const date = localDate && localDate.day + '/' + localDate.month + '/' + localDate.year

    const handleDelete = () => itemService.remove(id, "articles");



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
                    <Table.Cell>{tagit && tagit.map(tagi => <p key={tagi}>{tagi}</p>)}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Related courses</Table.Cell>
                    <Table.Cell>{related && related.map(related => <p key={related}>{related}</p>)}</Table.Cell>
                </Table.Row>


                <Table.Row>
                    <Table.Cell width={3} >
                        <Button basic color='red' onClick={handleDelete}>Delete</Button>
                    </Table.Cell>
                    <Table.Cell />
                </Table.Row>
            </Table.Body>
        </Table>
    )
}