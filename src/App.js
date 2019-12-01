import 'fomantic-ui-css/semantic.css';
import React, { useEffect, useState } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { CreateForm } from './components/CreateForm';
import { ListEntries } from './components/ListEntries';
import { NavBar } from './components/NavBar';
import { useResource } from './hooks';

function App() {
  const [items, itemService] = useResource(process.env.REACT_APP_BACKEND_URL+'/books')
  const [showForm, setShowForm] = useState(false)
  const [categorySelected, setCategorySelected] = useState(0)

  useEffect(() => {
    itemService.init()
  }, [itemService])

  return (
    <Container>
      <Header>
        <Header size='huge'>Lukuvinkkikirjasto</Header>
        <NavBar selected={categorySelected} setSelected={setCategorySelected} />
        <Button onClick={() => setShowForm(!showForm)}>Show form</Button>
        {showForm ? <CreateForm selected={categorySelected} itemService={itemService} /> : <div/>}
        <ListEntries items={items} selected={categorySelected} />
      </Header>
    </Container >
  );
}

export default App;
