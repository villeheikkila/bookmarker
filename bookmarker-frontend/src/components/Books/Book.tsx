import React, { useContext } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import { ItemServiceContext } from '../../App';

export const Book = ({ id, author, title, isbn, tags, related, year }: Book) => {
    const { itemService }: any = useContext(ItemServiceContext);

    const splitRelated = (related && related.split(',')) || [];
    const splitTags = (tags && tags.split(',')) || [];

    const handleDelete = () => itemService.remove(id, 'books');

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
                    <Table.Cell width={3}>ISBN</Table.Cell>
                    <Table.Cell>{isbn}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Year</Table.Cell>
                    <Table.Cell>{year}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Tags</Table.Cell>
                    <Table.Cell>
                        {splitTags.map(tag => (
                            <Label key={tag}>
                                <Icon name="tag" />
                                {tag}
                            </Label>
                        ))}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Related courses</Table.Cell>
                    <Table.Cell>
                        {splitRelated.map(related => (
                            <Label key={related}>{related}</Label>
                        ))}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>
                        <Button inverted color="red" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Table.Cell>
                    <Table.Cell />
                </Table.Row>
            </Table.Body>
        </Table>
    );
};
