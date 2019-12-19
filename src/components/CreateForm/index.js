import React from 'react';
import { ArticleForm } from '../Articles/ArticleForm';
import { BlogForm } from '../Blogs/BlogForm';
import { BookForm } from '../Books/BookForm';
import { VideoForm } from '../Videos/VideoForm';

export const CreateForm = ({ selected, itemService }) => {

    return (
        <div>
            {selected === 0 ?
                <BookForm itemService={itemService} />
                : selected === 1 ?
                    <VideoForm itemService={itemService} />
                    : selected === 2 ?
                        <ArticleForm itemService={itemService} />
                        :
                        <BlogForm itemService={itemService} />}
        </div>
    )

}
