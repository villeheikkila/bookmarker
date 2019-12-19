import 'fomantic-ui-css/semantic.min.css';
import React, { createContext, useEffect, useState } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { CreateForm } from './components/CreateForm';
import { ListEntries } from './components/ListEntries';
import { NavBar } from './components/NavBar';
import { useResource } from './hooks/useResource';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

export const App = () => {
    const [items, itemService] = useResource(BACKEND_URL);
    console.log('TCL: items', items);
    const [showForm, setShowForm] = useState(false);
    const [categorySelected, setCategorySelected] = useState(-1);

    useEffect(() => {
        itemService.init();
    }, [itemService]);

    return (
        <Container>
            <style>
                {`
      html, body {
        background-color: #1C1C1E !important;
      }`}
            </style>
            <Header size="huge" inverted>
                Bookmarker
            </Header>

            <NavBar selected={categorySelected} setSelected={setCategorySelected} setShowForm={setShowForm} />

            {categorySelected >= 0 && categorySelected < 5 && (
                <Button
                    inverted
                    color="purple"
                    style={{ display: 'block', margin: '0 auto' }}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Close form' : 'Show form'}
                </Button>
            )}

            {showForm ? <CreateForm selected={categorySelected} itemService={itemService} /> : <div />}

            <ItemServiceContext.Provider value={{ itemService }}>
                <ListEntries items={items} selected={categorySelected} />
            </ItemServiceContext.Provider>
        </Container>
    );
};

export const ItemServiceContext = createContext({});
