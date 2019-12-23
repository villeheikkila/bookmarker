import React, { useContext, useState } from 'react';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { Button, Form, Input } from 'semantic-ui-react';
import { ItemServiceContext } from '../../App';
import { GetYouTubeData } from '../../services/youtube';
import { OwnLoader } from '../OwnLoader';

export const VideoForm = () => {
    const [showFullForm, setShowFullForm] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { itemService }: any = useContext(ItemServiceContext);

    const { register, handleSubmit, setValue, reset } = useForm();

    const onSubmit = async ({ author, title, url, comment, related }: any) => {
        await itemService.create(
            {
                id: Math.floor(Math.random() * 1000 + 1),
                author,
                title,
                url,
                related,
                comment,
            },
            'videos',
        );

        reset({
            author: '',
            title: '',
            url: '',
            related: '',
            comment: '',
        });
    };

    const autoFillWithYoutubeUrl = async ({ url }: any) => {
        setShowLoader(true);

        try {
            const details = await GetYouTubeData(url);
            setValue('author', details['channelTitle']);
            setValue('title', details['title']);
            setShowLoader(false);
            setShowFullForm(true);
        } catch {
            setShowLoader(false);
            loadError();
        }
    };

    const loadError = () => {
        setShowLoader(false);
        setErrorMessage("Couldn't find anything with given URL");
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} inverted>
            <Form.Field>
                <RHFInput as={<Input label="URL" />} name="url" setValue={setValue} register={register} />
            </Form.Field>

            <Button primary onClick={handleSubmit(autoFillWithYoutubeUrl)}>
                Autofill
            </Button>

            <p style={{ color: 'red' }}>{errorMessage}</p>

            {showLoader && <OwnLoader />}

            {showFullForm && (
                <>
                    <Form.Field>
                        <RHFInput
                            as={<Input label="Channel" />}
                            name="author"
                            setValue={setValue}
                            register={register}
                        />
                    </Form.Field>

                    <Form.Field>
                        <RHFInput as={<Input label="Title" />} name="title" setValue={setValue} register={register} />
                    </Form.Field>
                </>
            )}

            <Form.Field>
                <RHFInput
                    as={<Input label="Related Courses" />}
                    name="related"
                    setValue={setValue}
                    register={register}
                />
            </Form.Field>

            <Form.Field>
                <RHFInput as={<Input label="Comment" />} name="comment" setValue={setValue} register={register} />
            </Form.Field>

            <Button positive type="submit" value="Submit">
                Submit
            </Button>
        </Form>
    );
};
