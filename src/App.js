import 'fomantic-ui-css/semantic.css';
import React, { useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { CreateForm } from './components/CreateForm';
import { ListEntries } from './components/ListEntries';
import { useResource } from './hooks';

function App() {
  const [items, itemService] = useResource('http://localhost:3001/books')
  const [books, booksService] = useResource('http://localhost:3001/books')
  useEffect(() => {
    if (books.length === 0) booksService.getAll()
  }, [books.length, booksService])

  return (
    <Container>
      <Header>
        <Header size='huge'>Lukuvinkkikirjasto</Header>
        <CreateForm itemService={itemService} />
        <ListEntries items={items} />
      </Header>
    </Container >
  );
}

export default App;
