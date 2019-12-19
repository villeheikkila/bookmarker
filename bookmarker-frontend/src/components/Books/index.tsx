import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Book } from './Book';

interface BooksProps {
    books: Book[];
}

export const Books = ({ books }: BooksProps) => {
    const [sortedBooks, setSortedBooks] = useState<Book[]>([]);
    const [sortDirections, setSortDirections] = useState({
        author: true,
        title: true,
        year: true,
    });

    useEffect(() => {
        if (books && books.length !== 0) {
            setSortedBooks(books);
        } else setSortedBooks([]);
    }, [books]);

    const sortByAuthor = () => {
        const clone = sortDirections.author
            ? _.sortBy(sortedBooks, ['author'])
            : _.sortBy(sortedBooks, ['author']).reverse();
        setSortedBooks(clone);
        setSortDirections(prev => ({
            ...prev,
            author: !prev.author,
        }));
    };

    const sortByTitle = () => {
        const clone = sortDirections.title
            ? _.sortBy(sortedBooks, ['title'])
            : _.sortBy(sortedBooks, ['title']).reverse();
        setSortedBooks(clone);
        setSortDirections(prev => ({
            ...prev,
            title: !prev.title,
        }));
    };

    const sortByYear = () => {
        const clone = sortDirections.year
            ? _.sortBy(sortedBooks, function(book) {
                  return book.year;
              })
            : _.sortBy(sortedBooks, function(book) {
                  return book.year;
              }).reverse();
        setSortedBooks(clone);
        setSortDirections(prev => ({
            ...prev,
            year: !prev.year,
        }));
    };

    return (
        <>
            <Button.Group basic size="large" color="green" inverted style={{ display: 'flex', marginBottom: '10px' }}>
                <Button onClick={sortByAuthor}>Sort by author</Button>
                <Button onClick={sortByTitle}>Sort by title</Button>
                <Button onClick={sortByYear}>Sort by year</Button>
            </Button.Group>

            {sortedBooks.map(book => (
                <Book key={book.id} {...book} />
            ))}
        </>
    );
};
