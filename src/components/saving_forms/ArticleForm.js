import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { useField } from "../../hooks/useField";

export const ArticleForm = ({ itemService }) => {
    const [doi, setDoi] = useState("");
    const [kirjoittaja, setKirjoittaja] = useField("text");
    const [otsikko, setOtsikko] = useField("text");
    const [publisher, setPublisher] = useField("text");
    const [localDate, setLocalDate] = useField("text");
    const [tagit, setTags] = useField("text");
    const [related, setRelated] = useField("text");

    const handleSubmit = e => {
        e.preventDefault();

        itemService.create(
            {
                id: Math.floor(Math.random() * 1000 + 1),
                author: kirjoittaja.value,
                title: otsikko.value,
                publisher: publisher.value,
                localDate: localDate.value,
                tagit: tagit.value.split(","),
                related: related.value.split(",")
            },
            "articles"
        );

        setKirjoittaja();
        setOtsikko();
        setPublisher();
        setLocalDate();
        setTags();
        setRelated();
    };

    const lookUpDOI = async e => {
        e.preventDefault();
        let articleJson = await axios.get(
            `https://api.altmetric.com/v1/doi/${doi}`
        );
        if (articleJson) {
            articleJson = articleJson.data;
            setKirjoittaja(articleJson.authors.join(", "));
            setOtsikko(articleJson.title);
            setPublisher(articleJson.journal);
            let publishedOn = new Date(0);
            publishedOn.setUTCSeconds(parseInt(articleJson.published_on));
            let publishedOnString = publishedOn.toISOString().split('T')[0]
            setLocalDate(publishedOnString);
        }
    };

    return (
        <div>
            <Form
                style={{ marginBottom: "10px", marginTop: "10px" }}
                onSubmit={lookUpDOI}
                inverted
            >
                <Form.Field>
                    <label>DOI</label>
                    <Input
                        type="text"
                        placeholder="DOI"
                        onChange={e => setDoi(e.target.value)}
                    />
                </Form.Field>
                <Button primary type="submit">
                    Look up info by DOI
        </Button>
            </Form>

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
        </div>
    );
};
