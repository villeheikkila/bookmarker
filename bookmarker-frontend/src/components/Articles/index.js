import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Article } from './Article';

export const Articles = ({ articles }) => {
    const [sortedArticles, setSortedArticles] = useState([]);
    const [sortDirections, setSortDirections] = useState({
        author: true,
        title: true,
        publisher: true,
        date: true,
    });

    useEffect(() => {
        if (articles && articles.length !== 0) {
            setSortedArticles(articles);
        } else setSortedArticles([]);
    }, [articles]);

    const sortByAuthor = () => {
        const clone = sortDirections.author
            ? _.sortBy(sortedArticles, ['author'])
            : _.sortBy(sortedArticles, ['author']).reverse();
        setSortedArticles(clone);
        setSortDirections(prev => ({
            ...prev,
            author: !prev.author,
        }));
    };

    const sortByTitle = () => {
        const clone = sortDirections.title
            ? _.sortBy(sortedArticles, ['title'])
            : _.sortBy(sortedArticles, ['title']).reverse();
        setSortedArticles(clone);
        setSortDirections(prev => ({
            ...prev,
            title: !prev.title,
        }));
    };

    const sortByPublisher = () => {
        const clone = sortDirections.publisher
            ? _.sortBy(sortedArticles, ['publisher'])
            : _.sortBy(sortedArticles, ['publisher']).reverse();
        setSortedArticles(clone);
        setSortDirections(prev => ({
            ...prev,
            publisher: !prev.publisher,
        }));
    };

    const sortByDate = () => {
        const clone = sortDirections.date
            ? _.sortBy(sortedArticles, function(article) {
                  return new Date(article.date);
              })
            : _.sortBy(sortedArticles, function(article) {
                  return new Date(article.date);
              }).reverse();
        setSortedArticles(clone);
        setSortDirections(prev => ({
            ...prev,
            date: !prev.date,
        }));
    };

    return (
        <>
            <Button.Group basic size="large" color="green" inverted style={{ display: 'flex', marginBottom: '10px' }}>
                <Button onClick={sortByAuthor}>Sort by author</Button>
                <Button onClick={sortByTitle}>Sort by title</Button>
                <Button onClick={sortByPublisher}>Sort by publisher</Button>
                <Button onClick={sortByDate}>Sort by date</Button>
            </Button.Group>
            {sortedArticles.map(a => (
                <Article key={a.id} article={a} />
            ))}
        </>
    );
};
