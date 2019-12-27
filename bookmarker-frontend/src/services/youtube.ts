import axios from 'axios';
import { REACT_APP_YOUTUBE_API_KEY } from '../';

export const GetYouTubeData = async (url: string) => {
    const id = url.toLowerCase().includes('youtube')
        ? url
              .split('?')[1]
              .split('&')[0]
              .split('=')[1]
        : url.split('//')[1].split('/')[1];

    const properURL =
        'https://www.googleapis.com/youtube/v3/videos/?part=snippet&id=' + id + '&key=' + REACT_APP_YOUTUBE_API_KEY;

    const {
        data: { items },
    } = await axios.get(properURL);

    return {
        id,
        details: items[0].snippet,
    };
};
