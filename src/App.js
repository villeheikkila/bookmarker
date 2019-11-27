import 'fomantic-ui-css/semantic.css';
import React, { useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { CreateForm } from './components/CreateForm';
import { ListEntries } from './components/ListEntries';
import { NavBar } from './components/NavBar';
import { useResource } from './hooks';

function App() {
  const [items, itemService] = useResource('http://127.0.0.1:5500/db.json')
  const [categorySelected, setCategorySelected] = useState(0)

  useEffect(() => {
    itemService.init()
  }, [itemService])

  return (
    <Container>
      <Header>
        <Header size='huge'>Lukuvinkkikirjasto</Header>
        <NavBar selected={categorySelected} setSelected={setCategorySelected} />
        <CreateForm selected={categorySelected} itemService={itemService} />
        <ListEntries items={items} selected={categorySelected} />
      </Header>
    </Container >
  );
}

export default App;
