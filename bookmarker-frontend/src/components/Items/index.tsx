import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { ItemModal } from './ItemModal';

interface ItemsTableProps {
    items: any;
}
export const ItemsTable = ({ items }: ItemsTableProps) => {
    const [data, setData] = useState({
        column: '',
        data: [],
        direction: '',
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState(null);

    useEffect(() => {
        if (items) {
            setData((prevState: any) => ({
                ...prevState,
                data: Object.values(items).reduce(
                    (result: any, prev: any) =>
                        result.concat(
                            prev.map((p: any) => ({ type: p.type, author: p.author, title: p.title, id: p.id })),
                        ),
                    [],
                ),
            }));
        }
    }, [items]);

    const handleSort = (clickedColumn: any, st: any) => () => {
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

    const handleModal = (item: any) => {
        const itemFull = items[item.type + 's'].find((i: any) => i.id === item.id);
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
                            sorted={data.column === 'type' ? (data.direction as any) : null}
                            onClick={handleSort('type', data)}
                        >
                            Type
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={data.column === 'author' ? (data.direction as any) : null}
                            onClick={handleSort('author', data)}
                        >
                            Author
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={data.column === 'title' ? (data.direction as any) : null}
                            onClick={handleSort('title', data)}
                        >
                            Title
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.data.length !== 0 ? (
                        data.data.map((item: any) => (
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
