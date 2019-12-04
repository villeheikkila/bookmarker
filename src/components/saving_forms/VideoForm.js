import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../../hooks';

export const VideoForm = ({ itemService }) => {
    const [author, authorReset] = useField('text')
    const [otsikko, otsikkoReset] = useField('text')
    const [url, urlReset] = useField('text')
    const [relatedCourses, relatedCoursesReset] = useField('text')
    const [kommentti, kommenttiReset] = useField('text')
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        await itemService.create({
            id: Math.floor((Math.random() * 1000) + 1),
            author: author.value,
            title: otsikko.value,
            url: url.value,
            relatedCourses: relatedCourses.value.splice(","),
            comment: kommentti.value
        }, "videos")

        authorReset();
        otsikkoReset();
        urlReset();
        relatedCoursesReset();
        kommenttiReset();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Kirjoittaja</label>
                <input {...author} />
            </Form.Field>
            
            <Form.Field>
                <label>Otsikko</label>
                <input {...otsikko} />
            </Form.Field>

            <Form.Field>
                <label>Url</label>
                <input {...url} />
            </Form.Field>

            <Form.Field>
                <label>Related courses</label>
                <input {...relatedCourses} />
            </Form.Field>

            <Form.Field>
                <label>Kommentti</label>
                <input {...kommentti} />
            </Form.Field>

            <Button positive type="submit" value="Submit">Lähetä</Button>
        </Form>
    )
}