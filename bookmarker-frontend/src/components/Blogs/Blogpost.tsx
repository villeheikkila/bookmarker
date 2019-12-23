import React, { useContext } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import { ItemServiceContext } from '../../App';

interface BlogpostProps {
    blogpost: Blogpost;
}

export const Blogpost = ({ blogpost: { id, author, title, url, tags, relatedCourses } }: BlogpostProps) => {
    const { itemService }: any = useContext(ItemServiceContext);

    const handleDelete = () => itemService.remove(id, 'blogposts');

    const relatedSplit = relatedCourses ? relatedCourses.split(',') : [];
    const tagitSplit = tags ? tags.split(',') : [];

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
                    <Table.Cell>
                        <a href={url}>{url}</a>
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Tags</Table.Cell>
                    <Table.Cell>
                        {tagitSplit.map((tagi: string) => (
                            <Label key={tagi}>
                                <Icon name="tag" />
                                {tagi}
                            </Label>
                        ))}
                    </Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Related courses</Table.Cell>
                    <Table.Cell>
                        {relatedSplit && relatedSplit.map((related: string) => <Label key={related}>{related}</Label>)}
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
