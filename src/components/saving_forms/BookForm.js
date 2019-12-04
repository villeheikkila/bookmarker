import React, {useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../../hooks';
import {OwnLoader} from '../OwnLoader'

export const BookForm = ({ itemService }) => {
    const [kirjoittaja, kirjoittajaReset] = useField('text')
    const [otsikko, otsikkoReset] = useField('text')
    const [isbn, isbnReset] = useField('text')
    const [year, yearReset] = useField('text')
    const [edition, editionReset] = useField('text')
    const [tagit, tagitReset] = useField('text')
    const [related, relatedReset] = useField('text')
    const [isbnErrorMessage, setIsbnErrorMessage] = useState()
    const [showFullForm, setShowFullForm] = useState(false)
    const [isbnLoader, setIsbnLoader] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault();

        itemService.create({
            id: Math.floor((Math.random() * 1000) + 1),
            kirjoittaja: kirjoittaja.value,
            title: otsikko.value,
            isbn: isbn.value,
            year: year.value,
            edition: edition.value,
            tagit: tagit.value.split(','),
            related: related.value.split(',')
        })

        kirjoittajaReset();
        otsikkoReset();
        isbnReset();
        yearReset();
        editionReset();
        tagitReset();
        relatedReset();
    }

    const autoFillWithISBN = () => {
        setIsbnLoader(true)
        fetch('https://openlibrary.org/api/books?bibkeys=ISBN:'+isbn.value.trim()+'&jscmd=details&format=json')
        .then((response) => response.json())
        .then((json) => {
            setIsbnErrorMessage()
            const data = json['ISBN:'+isbn.value]
            if(data === undefined) {
                isbnError()
                return
            }
            const details = data['details']
            kirjoittajaReset(details['authors'][0]['name'])
            otsikkoReset(details['title'])
            yearReset(details['publish_date'])
            editionReset(details['revision'])
            setIsbnLoader(false)
            setShowFullForm(true)
        })
        .catch(()=>isbnError)
    }

    const isbnError = () => {
        setIsbnLoader(false)
        setIsbnErrorMessage("Couldn't find anything with given ISBN")
        setTimeout(()=>{
            setIsbnErrorMessage()
        },5000)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>ISBN</label>
                <input {...isbn} />
            </Form.Field>

            <button onClick={autoFillWithISBN}>Autofill</button>

            <p style={{color:'red'}}>{isbnErrorMessage}</p>

            {isbnLoader ?
                <OwnLoader />
            :
                null
            }

            {showFullForm ?
                <div>
                    <Form.Field>
                        <label>Kirjoittaja</label>
                        <input {...kirjoittaja} />
                    </Form.Field>

                    <Form.Field>
                        <label>Otsikko</label>
                        <input {...otsikko} />
                    </Form.Field>

                    <Form.Field>
                        <label>Vuosi</label>
                        <input {...year} />
                    </Form.Field>

                    <Form.Field>
                        <label>Edition</label>
                        <input {...edition} />
                    </Form.Field>
                </div>
            :
                null
            }

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