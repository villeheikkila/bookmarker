import 'fomantic-ui-css/semantic.min.css';
import React, { createContext, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { BACKEND_URL } from './';
import { CreateForm } from './components/CreateForm';
import { ListEntries } from './components/ListEntries';
import { NavBar } from './components/NavBar';
import { useResource } from './hooks/useResource';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    '@global': {
        body: {
            backgroundColor: "#1C1C1E",
        },
        html: {
            backgroundColor: "#1C1C1E",
        }
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        fontSize: 70
    }
})

const App = () => {
    const [items, itemService] = useResource(BACKEND_URL);
    const [categorySelected, setCategorySelected] = useState(-1);
    const classes = useStyles()

    return (
        <Container>
            <Header size="huge" inverted className={classes.header}>
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
export default (App);