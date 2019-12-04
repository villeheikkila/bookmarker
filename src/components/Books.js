import React, { useEffect, useState } from 'react'
import { Book } from './Book'

export const Books = ({books}) => {
    const [sortedBooks, setSortedBooks] = useState([])

    useEffect(() => {
        if (books !== undefined && books.length !== 0) {
            setSortedBooks(books)
        }
        else setSortedBooks([])
    }, [books])

    return (
        <div>
            {sortedBooks.map(b => <Book key={b.id} book={b} />)}
        </div>
    )
} 