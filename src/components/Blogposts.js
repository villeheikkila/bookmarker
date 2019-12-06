import React, { useEffect, useState } from 'react'
import { Blogpost } from './Blogpost'

export const Blogposts = ({ blogs }) => {
    const [sortedBlogs, setSortedBlogs] = useState([])

    useEffect(() => {
        if (blogs !== undefined && blogs.length !== 0) {
            setSortedBlogs(blogs)
        }
        else setSortedBlogs([])
    }, [blogs])

    return (
        <div>
            {sortedBlogs.map(b => <Blogpost key={b.id} blostgpost={b} />)}
        </div>
    )
}