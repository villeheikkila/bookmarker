import React from 'react'
import { Video } from './Video'

export const Videos = ({ videos }) => {
    return (
        <div>
            {videos.map(v => <Video key={v.id} video={v} />)}
        </div>
    )
} 