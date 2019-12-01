import React, { useEffect, useState } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { Books } from './Books';
import { ItemsTable } from './ItemsTable';
import { Videos } from './Videos';

export const ListEntries = ({ items, selected }) => {
    const [filteredItems, setFilteredItems] = useState([])
    useEffect(() => {
        if (!items.length === 0 && items !== undefined) {
            switch (selected) {
                case 0:
                    setFilteredItems(items.books)
                    break
                case 1:
                    setFilteredItems(items.items)
                    break
                case 2:
                    setFilteredItems(items.articles)
                    break
                case 3:
                    setFilteredItems(items.blogposts)
                    break
                default:
                    setFilteredItems(items)
            }
        }
    }, [items, selected])

    return (
        <>
            <Divider horizontal>
                <Header as='h2'>
                    {selected === 0 ? 'Books' : selected === 1 ? 'Videos' : selected === 2 ? 'Articles' : selected === 3 ? 'Blog posts' : 'All items'}
                </Header>
            </Divider>

            {selected === 0 ? <Books books={filteredItems} /> :
                selected === 1 ? <Videos videos={filteredItems} /> :
                    <ItemsTable items={items} />}
        </>
    )
}

