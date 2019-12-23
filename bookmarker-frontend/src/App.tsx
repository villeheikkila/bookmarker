import 'fomantic-ui-css/semantic.min.css';
import React, { createContext, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { BACKEND_URL } from './';
import { CreateForm } from './components/CreateForm';
import { ListEntries } from './components/ListEntries';
import { NavBar } from './components/NavBar';
import { useResource } from './hooks/useResource';

export const App = () => {
    const [items, itemService] = useResource(BACKEND_URL);
    const [categorySelected, setCategorySelected] = useState(-1);

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

            <NavBar selected={categorySelected} setSelected={setCategorySelected} />

            <ItemServiceContext.Provider value={{ itemService }}>
                <CreateForm selected={categorySelected} />
                <ListEntries items={items} selected={categorySelected} />
            </ItemServiceContext.Provider>
        </Container>
    );
};

export const ItemServiceContext = createContext({});
