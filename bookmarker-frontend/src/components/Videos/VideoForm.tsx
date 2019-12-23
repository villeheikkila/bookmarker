import React, { FormEvent, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../../hooks/useField';
import { GetYouTubeData } from '../../services/youtube';
import { OwnLoader } from '../OwnLoader';

export const VideoForm = ({ itemService }: any) => {
    const [author, authorReset] = useField('text');
    const [title, setTitle] = useField('text');
    const [url, setUrl] = useField('text');
    const [relatedCourses, relatedCoursesReset] = useField('text');
    const [comment, setComment] = useField('text');
    const [showFullForm, setShowFullForm] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [id, setId] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await itemService.create(
            {
                id: Math.floor(Math.random() * 1000 + 1),
                author: author.value,
                title: title.value,
                url: id,
                related: relatedCourses,
                comment: comment.value,
            },
            'videos',
        );

        authorReset('');
        setTitle('');
        setUrl('');
        relatedCoursesReset('');
        setComment('');
    };

    const autoFillWithYoutubeUrl = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setShowLoader(true);

        if (url.value) {
            try {
                const details = await GetYouTubeData(url.value);
                authorReset(details['channelTitle']);
                setTitle(details['title']);
                setShowLoader(false);
                setId(id);
                setShowFullForm(true);
            } catch {
                loadError();
            }
        } else {
            setShowLoader(false);
            setErrorMessage("URL can't be empty");
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
        <Form onSubmit={handleSubmit} inverted>
            <Form.Field>
                <label>Url</label>
                <input {...url} />
            </Form.Field>

            <Button primary onClick={autoFillWithYoutubeUrl}>
                Autofill
            </Button>

            <p style={{ color: 'red' }}>{errorMessage}</p>

            {showLoader && <OwnLoader />}

            {showFullForm && (
                <div>
                    <Form.Field>
                        <label>Channel</label>
                        <input {...author} />
                    </Form.Field>

                    <Form.Field>
                        <label>Title</label>
                        <input {...title} />
                    </Form.Field>
                </div>
            )}

            <Form.Field>
                <label>Related courses</label>
                <input {...relatedCourses} />
            </Form.Field>

            <Form.Field>
                <label>Comment</label>
                <input {...comment} />
            </Form.Field>

            <Button positive type="submit" value="Submit">
                Submit
            </Button>
        </Form>
    );
};
