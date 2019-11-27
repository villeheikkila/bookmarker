import React from 'react';
import { BlogForm } from './saving_forms/BlogForm';
import { BookForm } from './saving_forms/BookForm';
import { VideoForm } from './saving_forms/VideoForm';

export const CreateForm = ({ selected, itemService }) => {

    return (
        <div>
            {selected === 0 ?
                <BookForm itemService={itemService} />
                : selected === 1 ?
                    <VideoForm itemService={itemService} />
                    : selected === 2 ?
                        <BlogForm itemService={itemService} />
                        :
                        <BlogForm itemService={itemService} />}
        </div>
    )

}
