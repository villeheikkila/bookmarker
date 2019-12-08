import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { TableCell } from 'semantic-ui-react';
import { Book } from '../components/Book';

Enzyme.configure({ adapter: new Adapter() });

const example = {
  "id": 30,
  "kirjoittaja": "Robert Martin",
  "otsikko": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "isbn": "978-0132350884",
  "tagit": ["Ohjelmointi, design patterns, agile"],
  "related": ["TKT20006 Ohjelmistotuotanto"]
}

describe('Book component', () => {

  it('Renders all fields if given valid props', () => {

    const wrapper = shallow(<Book book={example} />);

    expect(wrapper.contains(<TableCell as="td">Robert Martin</TableCell>)).toBe(false);
    expect(wrapper.contains(<TableCell as="td">Clean Code: A Handbook of Agile Software Craftsmanship</TableCell>)).toBe(false);
    expect(wrapper.contains(<TableCell as="td">978-0132350884</TableCell>)).toBe(true);
    expect(wrapper.contains(<p>Ohjelmointi, design patterns, agile</p>)).toBe(true);
    expect(wrapper.contains(<p>TKT20006 Ohjelmistotuotanto</p>)).toBe(true);
  });
});