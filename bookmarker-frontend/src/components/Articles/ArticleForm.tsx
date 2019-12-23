import React, { useContext, useState } from 'react';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { Button, Form, Input } from 'semantic-ui-react';
import { ItemServiceContext } from '../../App';
import { getArticleByDOI } from '../../services/altmetric';
import { OwnLoader } from '../OwnLoader';

export const ArticleForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const { itemService }: any = useContext(ItemServiceContext);
    const { register, handleSubmit, reset, setValue } = useForm();

    const onSubmit = ({ author, title, date, publisher, related, tags }: any) => {
        itemService.create(
            {
                author,
                title,
                publisher,
                date,
                tags,
                related,
            },
            'articles',
        );

        reset({
            author: null,
            title: null,
            tags: null,
            publisher: null,
            date: null,
            related: null,
        });
    };

    const lookUpDOI = async ({ doi }: any) => {
        setShowLoader(true);

        try {
            const { authors, title, journal, published_on } = await getArticleByDOI(doi);
            const publishedOn = new Date(0);
            publishedOn.setUTCSeconds(parseInt(published_on));
            const publishedOnString = publishedOn.toISOString().split('T')[0];

            setShowLoader(false);
            setValue('author', authors.join(', '));
            setValue('title', title);
            setValue('publisher', journal);
            setValue('date', publishedOnString);
        } catch {
            setShowLoader(false);
            error();
        }
    };

    const error = () => {
        setShowLoader(false);
        setErrorMessage("Couldn't find anything with given DOI");
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    };

    return (
        <>
            <Form style={{ marginBottom: '10px', marginTop: '10px' }} onSubmit={handleSubmit(lookUpDOI)} inverted>
                <Form.Field>
                    <RHFInput as={<Input label="DOI" />} name="doi" setValue={setValue} register={register} />
                </Form.Field>

                <Button primary type="submit">
                    Look up info by DOI
                </Button>
            </Form>

            {showLoader && <OwnLoader />}
            <p style={{ color: 'red' }}>{errorMessage}</p>

            <Form onSubmit={handleSubmit(onSubmit)} inverted>
                <Form.Field>
                    <RHFInput as={<Input label="Author" />} name="author" setValue={setValue} register={register} />
                </Form.Field>

                <Form.Field>
                    <RHFInput as={<Input label="Title" />} name="title" setValue={setValue} register={register} />
                </Form.Field>

                <Form.Field>
                    <RHFInput
                        as={<Input label="PublisherI" />}
                        name="publisher"
                        setValue={setValue}
                        register={register}
                    />
                </Form.Field>

                <Form.Field>
                    <RHFInput as={<Input label="Date" />} name="date" setValue={setValue} register={register} />
                </Form.Field>

                <Form.Field>
                    <RHFInput as={<Input label="Tags" />} name="tags" setValue={setValue} register={register} />
                </Form.Field>

                <Form.Field>
                    <RHFInput
                        as={<Input label="Related Courses" />}
                        name="related"
                        setValue={setValue}
                        register={register}
                    />
                </Form.Field>

                <Button positive type="submit" value="Submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};
