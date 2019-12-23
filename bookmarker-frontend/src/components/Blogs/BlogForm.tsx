import React from 'react';
import useForm from 'react-hook-form';
import { Button, Form } from 'semantic-ui-react';

export const BlogForm = ({ itemService }: any) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = ({ title, author, url, tags, related }: any) => {
        itemService.create(
            {
                title,
                author,
                tags,
                url,
                related,
            },
            'blogposts',
        );
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} inverted>
            <Form.Field>
                <label>Title</label>
                <input name="title" ref={register} />
            </Form.Field>

            <Form.Field>
                <label>Author</label>
                <input name="author" ref={register} />
            </Form.Field>

            <Form.Field>
                <label>URL</label>
                <input name="url" ref={register} />
            </Form.Field>

            <Form.Field>
                <label>Tags</label>
                <input name="tags" ref={register} />
            </Form.Field>

            <Form.Field>
                <label>Related courses</label>
                <input name="related" ref={register} />
            </Form.Field>

            <Button positive type="submit" value="Submit">
                Submit
            </Button>
        </Form>
    );
};
