import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useField } from '../../hooks/useField';
import { OwnLoader } from '../OwnLoader';

export const VideoForm = ({ itemService }) => {
    const [author, authorReset] = useField('text');
    const [title, setTitle] = useField('text');
    const [url, setUrl] = useField('text');
    const [relatedCourses, relatedCoursesReset] = useField('text');
    const [comment, setComment] = useField('text');
    const [showFullForm, setShowFullForm] = useState(false);
    const [loader, setLoader] = useState(false);
    const [id, setId] = useState();
    const [loadErrorMessage, setLoadErrorMessage] = useField();

    const handleSubmit = async e => {
        e.preventDefault();

        const splitRelated = relatedCourses.value.split(',');
        const related = splitRelated[0] !== '' ? splitRelated : null;

        const response = await itemService.create(
            {
                id: Math.floor(Math.random() * 1000 + 1),
                author: author.value,
                title: title.value,
                url: id,
                relatedCourses: related,
                comment: comment.value,
            },
            'videos',
        );
        console.log('TCL: handleSubmit -> response', response);

        authorReset();
        setTitle();
        setUrl();
        relatedCoursesReset();
        setComment();
    };

    const autoFillWithYoutubeUrl = e => {
        e.preventDefault();

        setLoader(true);
        // Parse from url
        if (url.value) {
            const id = url.value.toLowerCase().includes('youtube')
                ? url.value
                      .split('?')[1]
                      .split('&')[0]
                      .split('=')[1]
                : url.value.split('//')[1].split('/')[1];
            console.log('TCL: autoFillWithYoutubeUrl -> id', id);
            fetch(
                'https://www.googleapis.com/youtube/v3/videos/?part=snippet&id=' +
                    id.trim() +
                    '&key=' +
                    process.env.REACT_APP_YOUTUBE_API_KEY,
            )
                .then(response => response.json())
                .then(json => {
                    setLoadErrorMessage();
                    const data = json['items'];

                    if (!data) {
                        loadError();
                        return;
                    }

                    const details = data[0]['snippet'];
                    authorReset(details['channelTitle']);
                    setTitle(details['title']);
                    setLoader(false);
                    setId(id);
                    setShowFullForm(true);
                })
                .catch(() => loadError);
        } else {
            setLoadErrorMessage("URL can't be empty");
        }
    };

    const loadError = () => {
        setLoader(false);
        setLoadErrorMessage("Couldn't find anything with given URL");
        setTimeout(() => {
            setLoadErrorMessage();
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

            <p style={{ color: 'red' }}>{loadErrorMessage.value}</p>

            {loader && <OwnLoader />}

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
