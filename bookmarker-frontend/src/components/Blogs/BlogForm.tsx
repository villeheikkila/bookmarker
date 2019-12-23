import React, { useContext } from 'react';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { Button, Form, Input } from 'semantic-ui-react';
import { ItemServiceContext } from '../../App';

export const BlogForm = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { itemService }: any = useContext(ItemServiceContext);

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
                <RHFInput as={<Input label="Title" />} name="title" setValue={setValue} register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="Author" />} name="author" setValue={setValue} register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="URL" />} name="url" setValue={setValue} register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="Tags" />} name="tags" setValue={setValue} register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput
                    as={<Input label="Related courses" />}
                    name="related"
                    setValue={setValue}
                    register={register}
                />
            </Form.Field>

            <Button positive type="submit" value="Submit">
                Submit
            </Button>
        </Form>
    );
};
