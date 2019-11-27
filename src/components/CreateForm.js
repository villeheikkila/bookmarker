import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../hooks';

export const CreateForm = ({ booksService }) => {
    const [kirjoittaja, kirjoittajaReset] = useField('text')
    const [otsikko, otsikkoReset] = useField('text')
    const [isbn, isbnReset] = useField('text')
    const [tagit, tagitReset] = useField('text')
    const [related, relatedReset] = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault();

        booksService.create({
            id: Math.floor((Math.random() * 1000) + 1),
            kirjoittaja: kirjoittaja.value,
            otsikko: otsikko.value,
            isbn: isbn.value,
            tagit: tagit.value.split(','),
            related: related.value.split(',')
        })

        kirjoittajaReset();
        otsikkoReset();
        isbnReset();
        tagitReset();
        relatedReset();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Kirjoittaja</label>
                <input {...kirjoittaja} />
            </Form.Field>

            <Form.Field>
                <label>Otsikko</label>
                <input {...otsikko} />
            </Form.Field>

            <Form.Field>
                <label>ISBN</label>
                <input {...isbn} />
            </Form.Field>

            <Form.Field>
                <label>Tagit</label>
                <input {...tagit} />
            </Form.Field>

            <Form.Field>
                <label>Vastaavat kurssit</label>
                <input {...related} />
            </Form.Field>

            <Button positive type="submit" value="Submit">Lähetä</Button>
        </Form>
    )

}