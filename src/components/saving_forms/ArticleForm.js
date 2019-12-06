import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { useField } from '../../hooks';

export const ArticleForm = ({ booksService }) => {
    const [doi, setDoi] = useState('')
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

    const lookUpDOI = async (e) => {
        e.preventDefault()
        let articleJson = await axios.get(`https://api.altmetric.com/v1/doi/${doi}`)
        if (articleJson) {
            articleJson = articleJson.data
            kirjoittaja.setValue(articleJson.authors.join(', '))
            otsikko.setValue(articleJson.title)
            publisher.setValue(articleJson.journal)
            let publishedOn = new Date(0)
            publishedOn.setUTCSeconds(parseInt(articleJson.published_on))
            localDate.setValue(publishedOn.toLocaleDateString("fi-FI"))
        }

    }

    return (
        <div>
            <Form style={{marginBottom: '10px', marginTop: '10px'}} onSubmit={lookUpDOI}>
                <Form.Field>
                    <label>DOI</label>
                    <Input type='text' placeholder='DOI' onChange={e => setDoi(e.target.value)}/>
                </Form.Field>
                <Button primary type='submit'>Look up info by DOI</Button>
            </Form>

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
        </div>


    )
}