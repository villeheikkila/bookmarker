import React from 'react'
import { Book } from './Book'

export const Books = ({books}) => {
    return (
        <div>
            {books.map(b => <Book key={b.id} book={b} />)}
        </div>
    )
} 