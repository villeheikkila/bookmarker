import React, { useContext, useState } from 'react';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { Button, Form, Input } from 'semantic-ui-react';
import { ItemServiceContext } from '../../App';
import { GetDataByISBN } from '../../services/openlibrary';
import { OwnLoader } from '../OwnLoader';

export const BookForm = () => {
    const [errorMessage, setErrorMessage] = useState();
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
            const { publish_date, title, revision, authors } = await GetDataByISBN(isbn.trim());
            const author = authors ? authors[0].name : null;

            setShowLoader(false);
            setShowFullForm(true);

            setValue('author', author);
            setValue('title', title);
            setValue('edition', revision);
            setValue('year', publish_date.split(' ')[0]);
        } catch (error) {
            isbnError();
        }
    };

    const isbnError = () => {
        setShowLoader(false);
        setErrorMessage("Couldn't find anything with given ISBN");
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    };

    return (
        <>
            <RHFInput
                as={
                    <Input
                        label="ISBN"
                        action={{
                            icon: 'search',
                            onClick: handleSubmit(autoFillWithISBN),
                        }}
                        placeholder="Search..."
                    />
                }
                name="isbn"
                setValue={setValue}
                register={register}
            />

            {showLoader && <OwnLoader />}
            <p style={{ color: 'red' }}>{errorMessage}</p>

            {showFullForm && (
                <Form onSubmit={handleSubmit(onSubmit)} inverted>
                    <>
                        <Form.Field>
                            <RHFInput
                                as={<Input label="Author" />}
                                name="author"
                                setValue={setValue}
                                register={register}
                            />
                        </Form.Field>

                        <Form.Field>
                            <RHFInput
                                as={<Input label="Title" />}
                                name="title"
                                setValue={setValue}
                                register={register}
                            />
                        </Form.Field>

                        <Form.Field>
                            <RHFInput as={<Input label="Year" />} name="year" setValue={setValue} register={register} />
                        </Form.Field>

                        <Form.Field>
                            <RHFInput
                                as={<Input label="Edition" />}
                                name="edition"
                                setValue={setValue}
                                register={register}
                            />
                        </Form.Field>
                    </>

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
            )}
        </>
    );
};
