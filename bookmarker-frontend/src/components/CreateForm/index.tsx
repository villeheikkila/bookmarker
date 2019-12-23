import React from 'react';
import { ArticleForm } from '../Articles/ArticleForm';
import { BlogForm } from '../Blogs/BlogForm';
import { BookForm } from '../Books/BookForm';
import { VideoForm } from '../Videos/VideoForm';

interface CreateFormProps {
    selected: Number;
}
export const CreateForm = ({ selected }: CreateFormProps) => {
    return (
        <>
            {selected === 0 ? (
                <BookForm />
            ) : selected === 1 ? (
                <VideoForm />
            ) : selected === 2 ? (
                <ArticleForm />
            ) : selected === 3 ? (
                <BlogForm />
            ) : (
                <div />
            )}
        </>
    );
};
