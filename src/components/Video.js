import React from 'react';
import { Embed, Table } from 'semantic-ui-react';

export const Video = ({ video }) => {
    const { author, title, comment } = video;
    return (
        <div>
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
                        <Table.Cell width={3}>Comment</Table.Cell>
                        <Table.Cell>{comment}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width={3} >Video</Table.Cell>
                        <Table.Cell>
                            <Embed source='youtube' placeholder='http://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' id='dQw4w9WgXcQ' />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <div />

        </div>
    )
}
