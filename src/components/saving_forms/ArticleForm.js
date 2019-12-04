import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../../hooks';

export const ArticleForm = ({ booksService }) => {
    const [kirjoittaja, kirjoittajaReset] = useField('text')
    const [otsikko, otsikkoReset] = useField('text')
    const [publisher, publisherReset] = useField('text')
    const [localDate, localDateReset] = useField('text')
    const [tagit, tagitReset] = useField('text')
    const [related, relatedReset] = useField('text')
    
    const handleSubmit = (e) => {
        e.preventDefault();

        booksService.create({
            id: Math.floor((Math.random() * 1000) + 1),
            author: kirjoittaja.value,
            title: otsikko.value,
            publisher: publisher.value,
            localDate: localDate.value,
            tagit: tagit.value.split(','),
            related: related.value.split(',')
        }, "articles")

        kirjoittajaReset();
        otsikkoReset();
        publisherReset();
        localDateReset();
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
                <label>Julkaisija</label>
                <input {...publisher} />
            </Form.Field>

            <Form.Field>
                <label>Päivämäärä</label>
                <input {...localDate} />
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