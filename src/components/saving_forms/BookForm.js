import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../../hooks/useField';
import { OwnLoader } from '../OwnLoader';

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
            author: kirjoittaja.value,
            title: otsikko.value,
            isbn: isbn.value,
            year: year.value,
            edition: edition.value,
            tagit: tagit.value.split(","),
            related: related.value.split(",")
        }, "books")

        kirjoittajaReset();
        otsikkoReset();
        isbnReset();
        yearReset();
        editionReset();
        tagitReset();
        relatedReset();
    }

    const autoFillWithISBN = (e) => {
        e.preventDefault();

        setIsbnLoader(true)
        fetch('https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn.value.trim() + '&jscmd=details&format=json')
            .then((response) => response.json())
            .then((json) => {
                setIsbnErrorMessage()
                const data = json['ISBN:' + isbn.value]
                if (data === undefined) {
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
            .catch(() => isbnError)
    }

    const isbnError = () => {
        setIsbnLoader(false)
        setIsbnErrorMessage("Couldn't find anything with given ISBN")
        setTimeout(() => {
            setIsbnErrorMessage()
        }, 5000)
    }

    return (
        <Form onSubmit={handleSubmit} inverted>
            <Form.Field>
                <label>ISBN</label>
                <input {...isbn} />
            </Form.Field>

            <Button primary onClick={autoFillWithISBN}>Autofill</Button>

            <p style={{ color: 'red' }}>{isbnErrorMessage}</p>

            {isbnLoader && <OwnLoader />}

            {showFullForm &&
                <div>
                    <Form.Field>
                        <label>Author</label>
                        <input {...kirjoittaja} />
                    </Form.Field>

                    <Form.Field>
                        <label>Title</label>
                        <input {...otsikko} />
                    </Form.Field>

                    <Form.Field>
                        <label>Year</label>
                        <input {...year} />
                    </Form.Field>

                    <Form.Field>
                        <label>Edition</label>
                        <input {...edition} />
                    </Form.Field>
                </div>
            }

            <Form.Field>
                <label>Tags</label>
                <input {...tagit} />
            </Form.Field>

            <Form.Field>
                <label>Related Courses</label>
                <input {...related} />
            </Form.Field>

            <Button positive type="submit" value="Submit">Submit</Button>
        </Form>
    )
}