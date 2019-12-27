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
    const [id, setId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { itemService }: any = useContext(ItemServiceContext);

    const { register, handleSubmit, setValue, reset } = useForm();

    const onSubmit = async ({ author, title, url, comment, related }: any) => {
        await itemService.create(
            {
                id: Math.floor(Math.random() * 1000 + 1),
                author,
                title,
                url: id,
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

        setId(null);
    };

    const autoFillWithYoutubeUrl = async ({ url }: any) => {
        setShowLoader(true);

        try {
            const { id, details } = await GetYouTubeData(url);
            setId(id);
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
        <>
            <RHFInput
                as={
                    <Input
                        label="URL"
                        action={{
                            icon: 'search',
                            onClick: handleSubmit(autoFillWithYoutubeUrl),
                        }}
                        placeholder="Search..."
                    />
                }
                name="url"
                setValue={setValue}
                register={register}
            />

            {!showFullForm && (
                <Button inverted color="purple" onClick={() => setShowFullForm(!showFullForm)}>
                    Input manually
                </Button>
            )}

            <p style={{ color: 'red' }}>{errorMessage}</p>

            {showLoader && <OwnLoader />}

            {showFullForm && (
                <Form onSubmit={handleSubmit(onSubmit)} inverted>
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
                            <RHFInput
                                as={<Input label="Title" />}
                                name="title"
                                setValue={setValue}
                                register={register}
                            />
                        </Form.Field>

                        <Form.Field>
                            <RHFInput
                                as={<Input label="Related Courses" />}
                                name="related"
                                setValue={setValue}
                                register={register}
                            />
                        </Form.Field>

                        <Form.Field>
                            <RHFInput
                                as={<Input label="Comment" />}
                                name="comment"
                                setValue={setValue}
                                register={register}
                            />
                        </Form.Field>

                        <Button positive type="submit" value="Submit">
                            Submit
                        </Button>

                        <Button inverted color="purple" onClick={() => setShowFullForm(!showFullForm)}>
                            Close form
                        </Button>
                    </>
                </Form>
            )}
        </>
    );
};
