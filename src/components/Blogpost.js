import React, { useContext } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import { ItemServiceContext } from '../App';

export const Blogpost = ({ blogpost }) => {
    const { id, author, title, url, tagit, relatedCourses } = blogpost
    const { itemService } = useContext(ItemServiceContext)

    const handleDelete = () => itemService.remove(id, "blogposts");

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
                    <Table.Cell>{tagit && tagit.map(tagi => <Label key={tagi}>
                        <Icon name='tag' />{tagi}</Label>)}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Related courses</Table.Cell>
                    <Table.Cell>{relatedCourses && relatedCourses.map(related => <Label key={related}>{related}</Label>)}</Table.Cell>
                </Table.Row>


                <Table.Row>
                    <Table.Cell width={3} >
                        <Button inverted color='red' onClick={handleDelete}>Delete</Button>
                    </Table.Cell>
                    <Table.Cell />
                </Table.Row>
            </Table.Body>
        </Table>
    )
}