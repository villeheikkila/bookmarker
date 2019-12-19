import React from 'react';
import { ArticleForm } from '../Articles/ArticleForm';
import { BlogForm } from '../Blogs/BlogForm';
import { BookForm } from '../Books/BookForm';
import { VideoForm } from '../Videos/VideoForm';

interface CreateFormProps {
    selected: Number;
    itemService: any;
}
export const CreateForm = ({ selected, itemService }: CreateFormProps) => {
    return (
        <>
            {selected === 0 ? (
                <BookForm itemService={itemService} />
            ) : selected === 1 ? (
                <VideoForm itemService={itemService} />
            ) : selected === 2 ? (
                <ArticleForm itemService={itemService} />
            ) : (
                <BlogForm itemService={itemService} />
            )}
        </>
    );
};
