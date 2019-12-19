import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Video } from './Video';

interface VideosProps {
    videos: Video[];
}

export const Videos = ({ videos }: VideosProps) => {
    const [sortedVideos, setSortedVideos] = useState<Video[]>([]);
    const [sortDirections, setSortDirections] = useState({
        author: true,
        title: true,
    });

    useEffect(() => {
        if (videos && videos.length !== 0) {
            setSortedVideos(videos);
        } else setSortedVideos([]);
    }, [videos]);

    const sortByAuthor = () => {
        const clone = sortDirections.author
            ? _.sortBy(sortedVideos, ['author'])
            : _.sortBy(sortedVideos, ['author']).reverse();
        setSortedVideos(clone);
        setSortDirections(prev => ({
            ...prev,
            author: !prev.author,
        }));
    };

    const sortByTitle = () => {
        const clone = sortDirections.title
            ? _.sortBy(sortedVideos, ['title'])
            : _.sortBy(sortedVideos, ['title']).reverse();
        setSortedVideos(clone);
        setSortDirections(prev => ({
            ...prev,
            title: !prev.title,
        }));
    };

    return (
        <>
            <Button.Group basic size="large" color="green" inverted style={{ display: 'flex', marginBottom: '10px' }}>
                <Button onClick={sortByAuthor}>Sort by author</Button>
                <Button onClick={sortByTitle}>Sort by title</Button>
            </Button.Group>

            {sortedVideos.map((video: Video) => (
                <Video key={video.id} {...video} />
            ))}
        </>
    );
};
