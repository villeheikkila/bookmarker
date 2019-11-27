import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { Book } from './Book';

export const ListEntries = ({ items }) => {
    return (
        <>
            <Divider horizontal>
                <Header as='h2'>
                    Kirjat
                </Header>
            </Divider>

            {items.map(book => <Book key={book.id} book={book} />)}
        </>
    )
}

