import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../../hooks';

export const BlogForm = ({ itemService }) => {
    const [otsikko, otsikkoReset] = useField('text')
    const [kirjoittaja, kirjoittajaReset] = useField('text')
    const [url, urlReset] = useField('text')
    const [relatedCourses, relatedCoursesReset] = useField('text')
    const [tagit, tagitReset] = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault();

        itemService.create({
            id: Math.floor((Math.random() * 1000) + 1),
            title: otsikko.value,
            author: kirjoittaja.value,
            tagit: tagit.value.split(","),
            url: url.value,
            relatedCourses: relatedCourses.value.split(",")
        }, "blogposts")

        otsikkoReset();
        kirjoittajaReset();
        urlReset();
        relatedCoursesReset();
        tagitReset();
    }

    return (
        <Form onSubmit={handleSubmit} inverted>
            <Form.Field>
                <label>Title</label>
                <input {...otsikko} />
            </Form.Field>

            <Form.Field>
                <label>Author</label>
                <input {...kirjoittaja} />
            </Form.Field>

            <Form.Field>
                <label>URL</label>
                <input {...url} />
            </Form.Field>

            <Form.Field>
                <label>Tags</label>
                <input {...tagit} />
            </Form.Field>

            <Form.Field>
                <label>Related courses</label>
                <input {...relatedCourses} />
            </Form.Field>

            <Button positive type="submit" value="Submit">Lähetä</Button>
        </Form>
    )
}