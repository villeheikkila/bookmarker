import React, { useEffect, useState } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { Articles } from '../Articles';
import { Blogposts } from '../Blogs';
import { Books } from '../Books';
import { ItemsTable } from '../Items';
import { Videos } from '../Videos';

export const ListEntries = ({ items, selected }) => {
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        if (items !== undefined && items.length !== 0) {
            switch (selected) {
                case 0:
                    setFilteredItems(items.books);
                    break;
                case 1:
                    setFilteredItems(items.videos);
                    break;
                case 2:
                    setFilteredItems(items.articles);
                    break;
                case 3:
                    setFilteredItems(items.blogposts);
                    break;
                default:
                    setFilteredItems([]);
            }
        }
    }, [items, selected]);

    return (
        <>
            <Divider horizontal>
                <Header inverted as="h2">
                    {selected === 0
                        ? 'Books'
                        : selected === 1
                        ? 'Videos'
                        : selected === 2
                        ? 'Articles'
                        : selected === 3
                        ? 'Blog posts'
                        : 'All items'}
                </Header>
            </Divider>

            {selected === 0 ? (
                <Books books={filteredItems} />
            ) : selected === 1 ? (
                <Videos videos={filteredItems} />
            ) : selected === 2 ? (
                <Articles articles={filteredItems} />
            ) : selected === 3 ? (
                <Blogposts blogs={filteredItems} />
            ) : (
                <ItemsTable items={items} />
            )}
        </>
    );
};
