import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { Book } from './Book';

export const ListEntries = ({ books }) => {
    return (
        <>
            <Divider horizontal>
                <Header as='h2'>
                    Kirjat
                </Header>
            </Divider>

            {books.map(book => <Book key={book.id} book={book} />)}
        </>
    )
}

