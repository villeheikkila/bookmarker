import React, { useContext } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import { ItemServiceContext } from '../../App';

interface ArticleProps {
    article: Article;
}

export const Article = ({ article: { id, author, title, publisher, localDate, tagit, related } }: ArticleProps) => {
    const { itemService }: any = useContext(ItemServiceContext);

    const handleDelete = () => itemService.remove(id, 'articles');

    //const date = localDate && localDate.day + '/' + localDate.month + '/' + localDate.year;
    const date = '';
    const relatedSplit = related ? related.split(',') : [];
    const tagitSplit = tagit ? tagit.split(',') : [];

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
                    <Table.Cell width={3}>Publisher</Table.Cell>
                    <Table.Cell>{publisher}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Date published</Table.Cell>
                    <Table.Cell>{date}</Table.Cell>
                </Table.Row>

                <Table.Row>
                    <Table.Cell width={3}>Tags</Table.Cell>
                    <Table.Cell>
                        {tagitSplit &&
                            tagitSplit.map((tagi: any) => (
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
                        {relatedSplit && relatedSplit.map((related: any) => <Label key={related}>{related}</Label>)}
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
