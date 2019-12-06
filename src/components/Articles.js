import React, { useEffect, useState } from 'react'
import { Article } from './Article'

export const Articles = ({ articles }) => {
    const [sortedArticles, setSortedArticles] = useState([])

    useEffect(() => {
        if (articles !== undefined && articles.length !== 0) {
            setSortedArticles(articles)
        }
        else setSortedArticles([])
    }, [articles])

    return (
        <div>
            {sortedArticles.map(a => <Article key={a.id} article={a} />)}
        </div>
    )
} 