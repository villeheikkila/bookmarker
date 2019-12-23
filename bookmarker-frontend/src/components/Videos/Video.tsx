import React, { useContext } from 'react';
import { Button, Embed, Label, Table } from 'semantic-ui-react';
import { ItemServiceContext } from '../../App';

export const Video = ({ author, title, id, comment, url, related }: Video) => {
    const { itemService }: any = useContext(ItemServiceContext);

    const splitRelated = related ? related.split(',') : [];

    const handleDelete = () => itemService.remove(id, 'videos');

    return (
        <Table inverted celled>
            <Table.Body>
                <Table.Row>
                    <Table.Cell width={3}>Title</Table.Cell>
                    <Table.Cell>{title}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Channel</Table.Cell>
                    <Table.Cell>{author}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Comment</Table.Cell>
                    <Table.Cell>{comment}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Related courses</Table.Cell>
                    <Table.Cell>{splitRelated && splitRelated.map(rel => <Label key={rel}>{rel}</Label>)}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Video</Table.Cell>
                    <Table.Cell>
                        <Embed source="youtube" placeholder={`https://img.youtube.com/vi/${url}/0.jpg`} id={url} />
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
