import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../../hooks/useField';

export const BlogForm = ({ itemService }) => {
    const [otsikko, otsikkoReset] = useField('text');
    const [kirjoittaja, kirjoittajaReset] = useField('text');
    const [url, urlReset] = useField('text');
    const [relatedCourses, relatedCoursesReset] = useField('text');
    const [tagit, tagitReset] = useField('text');

    const handleSubmit = e => {
        e.preventDefault();

        const splitTags = tagit.value.split(',');
        const splitRelated = relatedCourses.value.split(',');

        const tags = splitTags[0] !== '' ? splitTags : null;
        const related = splitRelated[0] !== '' ? splitRelated : null;

        itemService.create(
            {
                id: Math.floor(Math.random() * 1000 + 1),
                title: otsikko.value,
                author: kirjoittaja.value,
                tagit: tags,
                url: url.value,
                relatedCourses: related,
            },
            'blogposts',
        );

        otsikkoReset();
        kirjoittajaReset();
        urlReset();
        relatedCoursesReset();
        tagitReset();
    };

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

            <Button positive type="submit" value="Submit">
                Submit
            </Button>
        </Form>
    );
};
