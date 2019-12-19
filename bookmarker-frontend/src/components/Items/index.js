import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { ItemModal } from './ItemModal';

export const ItemsTable = ({ items }) => {
    const [data, setData] = useState({
        column: '',
        data: '',
        direction: '',
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    useEffect(() => {
        if (items.length !== 0) {
            setData(prevState => ({
                ...prevState,
                data: Object.values(items).reduce(
                    (result, prev) =>
                        result.concat(prev.map(p => ({ type: p.type, author: p.author, title: p.title, id: p.id }))),
                    [],
                ),
            }));
        }
    }, [items]);

    const handleSort = (clickedColumn, st) => () => {
        const { column, data, direction } = st;
        if (column !== clickedColumn) {
            setData({
                column: clickedColumn,
                data: _.sortBy(st.data, clickedColumn),
                direction: 'ascending',
            });
            return;
        }
        setData(prevState => ({
            ...prevState,
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        }));
    };

    const handleModal = item => {
        const itemFull = items[item.type + 's'].find(i => i.id === item.id);
        setModalObject(itemFull);
        setModalOpen(true);
    };

    return (
        <>
            <ItemModal portalOpen={modalOpen} setPortalOpen={setModalOpen} item={modalObject} />
            <Table sortable celled inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={data.column === 'type' ? data.direction : null}
                            onClick={handleSort('type', data)}
                        >
                            Type
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={data.column === 'author' ? data.direction : null}
                            onClick={handleSort('author', data)}
                        >
                            Author
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={data.column === 'title' ? data.direction : null}
                            onClick={handleSort('title', data)}
                        >
                            Title
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.data.length !== 0 ? (
                        data.data.map(item => (
                            <Table.Row key={item.id} onClick={() => handleModal(item)}>
                                <Table.Cell key={`${item.id}${item.type}`}>{item.type}</Table.Cell>
                                <Table.Cell
                                    key={`${item.id}${item.author ? item.author : Math.floor(Math.random() * 1000)}`}
                                >
                                    {item.author}
                                </Table.Cell>
                                <Table.Cell
                                    key={`${item.id}${item.title ? item.title : Math.floor(Math.random() * 1000)}`}
                                >
                                    {item.title}
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row key="loading">
                            <Table.Cell>loading...</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </>
    );
};
