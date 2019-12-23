import React, { useState, useContext } from 'react';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { Button, Form, Input } from 'semantic-ui-react';
import { GetDataByISBN } from '../../services/openlibrary';
import { OwnLoader } from '../OwnLoader';
import { ItemServiceContext } from '../../App';

export const BookForm = () => {
    const [isbnErrorMessage, setIsbnErrorMessage] = useState();
    const [showFullForm, setShowFullForm] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm();
    const { itemService }: any = useContext(ItemServiceContext);


    const onSubmit = ({ isbn, author, title, tags, edition, year, related }: any) => {
        itemService.create(
            {
                author,
                title,
                isbn,
                year,
                edition,
                tags,
                related,
            },
            'books',
        );

        reset({
            author: '',
            title: '',
            tags: '',
            edition: '',
            year: '',
            related: '',
        });
    };

    const autoFillWithISBN = async ({ isbn }: any) => {
        setShowLoader(true);

        try {
            const details = await GetDataByISBN(isbn.value.trim());
            const year = new Date(details['publish_date']).getFullYear();

            setShowLoader(false);
            setShowFullForm(true);

            setValue('author', details['authors'][0]['name']);
            setValue('title', details['title']);
            setValue('edition', details['revision']);
            setValue('year', year);
        } catch {
            setShowLoader(false);
            isbnError();
        }
    };

    const isbnError = () => {
        setShowLoader(false);
        setIsbnErrorMessage("Couldn't find anything with given ISBN");
        setTimeout(() => {
            setIsbnErrorMessage('');
        }, 5000);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} inverted>
            <Form.Field>
                <RHFInput as={<Input label="ISBN" />} name="isbn" register={register} />
            </Form.Field>

            <Button primary onClick={handleSubmit(autoFillWithISBN)}>
                Autofill
            </Button>

            <p style={{ color: 'red' }}>{isbnErrorMessage}</p>

            {showLoader && <OwnLoader />}

            {showFullForm && (
                <>
                    <Form.Field>
                        <RHFInput as={<Input label="Author" />} name="author" register={register} />
                    </Form.Field>

                    <Form.Field>
                        <RHFInput as={<Input label="Title" />} name="title" register={register} />
                    </Form.Field>

                    <Form.Field>
                        <RHFInput as={<Input label="Year" />} name="year" register={register} />
                    </Form.Field>

                    <Form.Field>
                        <RHFInput as={<Input label="Edition" />} name="edition" register={register} />
                    </Form.Field>
                </>
            )}

            <Form.Field>
                <RHFInput as={<Input label="Tags" />} name="tags" register={register} />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="Related Courses" />} name="related" register={register} />
            </Form.Field>

            <Button positive type="submit" value="Submit">
                Submit
            </Button>
        </Form>
    );
};
