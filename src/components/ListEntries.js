import React, { useEffect, useState } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { Book } from './Book';
import { Video } from './Video';

export const ListEntries = ({ items, selected }) => {
    const [filteredItems, setFilteredItems] = useState([])

    useEffect(() => {
        switch (selected) {
            case 0:
                setFilteredItems(items.filter(item => item.type === 'book'))
                break
            case 1:
                setFilteredItems(items.filter(item => item.type === 'video'))
                break
            case 2:
                setFilteredItems(items.filter(item => item.type === 'article'))
                break
            case 3:
                setFilteredItems(items.filter(item => item.type === 'blog'))
                break
            default:
                setFilteredItems(items)
        }
    }, [items, selected, setFilteredItems])

    return (
        <>
            <Divider horizontal>
                <Header as='h2'>
                    {selected === 0 ? 'Books' : selected === 1 ? 'Videos' : selected === 2 ? 'Articles' : selected === 3 ? 'Blog posts' : 'All items'}
                </Header>
            </Divider>

            {filteredItems
                .map(item => item.type === 'book' ?
                    <Book key={item.id} book={item} /> :
                    item.type === 'video' ? <Video key={item.id} video={item} /> :
                        <div key={item.id}>Article or blog!</div>)}
        </>
    )
}

