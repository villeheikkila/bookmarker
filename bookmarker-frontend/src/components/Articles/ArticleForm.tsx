import React, { FormEvent, useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { useField } from '../../hooks/useField';
import { getArticleByDOI } from '../../services/altmetric';
import { OwnLoader } from '../OwnLoader';

export const ArticleForm = ({ itemService }: any) => {
    const [doi, setDoi] = useState('');
    const [kirjoittaja, setKirjoittaja] = useField('text');
    const [otsikko, setOtsikko] = useField('text');
    const [publisher, setPublisher] = useField('text');
    const [localDate, setLocalDate] = useField('text');
    const [tagit, setTags] = useField('text');
    const [related, setRelated] = useField('text');
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const splitTags = tagit.value.split(',');
        const splitRelated = related.value.split(',');
        const dateFixed = localDate.value === '' ? null : localDate.value;
        const tags = splitTags[0] !== '' ? splitTags : null;
        const relatedCoureses = splitRelated[0] !== '' ? splitRelated : null;

        itemService.create(
            {
                id: Math.floor(Math.random() * 1000 + 1),
                author: kirjoittaja.value,
                title: otsikko.value,
                publisher: publisher.value,
                localDate: dateFixed,
                tags: tags,
                related: relatedCoureses,
            },
            'articles',
        );

        setKirjoittaja();
        setOtsikko();
        setPublisher();
        setLocalDate();
        setTags();
        setRelated();
    };

    const lookUpDOI = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowLoader(true);

        try {
            const data = await getArticleByDOI(doi);
            const publishedOn = new Date(0);
            publishedOn.setUTCSeconds(parseInt(data.published_on));
            const publishedOnString = publishedOn.toISOString().split('T')[0];

            setKirjoittaja(data.authors.join(', '));
            setOtsikko(data.title);
            setPublisher(data.journal);
            setLocalDate(publishedOnString);
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
            <Form style={{ marginBottom: '10px', marginTop: '10px' }} onSubmit={lookUpDOI} inverted>
                <Form.Field>
                    <label>DOI</label>
                    <Input type="text" placeholder="DOI" onChange={e => setDoi(e.target.value)} />
                </Form.Field>

                <Button primary type="submit">
                    Look up info by DOI
                </Button>
            </Form>

            {showLoader && <OwnLoader />}
            <p style={{ color: 'red' }}>{errorMessage}</p>

            <Form onSubmit={handleSubmit} inverted>
                <Form.Field>
                    <label>Author</label>
                    <input {...kirjoittaja} />
                </Form.Field>

                <Form.Field>
                    <label>Title</label>
                    <input {...otsikko} />
                </Form.Field>

                <Form.Field>
                    <label>Publisher</label>
                    <input {...publisher} />
                </Form.Field>

                <Form.Field>
                    <label>Date</label>
                    <input {...localDate} />
                </Form.Field>

                <Form.Field>
                    <label>Tags</label>
                    <input {...tagit} />
                </Form.Field>

                <Form.Field>
                    <label>Related Courses</label>
                    <input {...related} />
                </Form.Field>

                <Button positive type="submit" value="Submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};
