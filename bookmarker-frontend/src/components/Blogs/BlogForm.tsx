import React from 'react';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { Button, Form, Input } from 'semantic-ui-react';

export const BlogForm = ({ itemService }: any) => {
    const { register, handleSubmit, reset } = useForm();

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

        reset({
            author: '',
            title: '',
            tags: '',
            related: '',
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} inverted>
            <Form.Field>
                <RHFInput as={<Input label="Title" />} name="title" register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="Author" />} name="author" register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="URL" />} name="url" register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="Tags" />} name="tags" register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="Related courses" />} name="related" register={register} />
            </Form.Field>

            <Button positive type="submit" value="Submit">
                Submit
            </Button>
        </Form>
    );
};
