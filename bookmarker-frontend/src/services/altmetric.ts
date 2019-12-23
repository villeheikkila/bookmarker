import axios from 'axios';

export const getArticleByDOI = async (doi: string) => {
    const { data } = await axios.get(`https://api.altmetric.com/v1/doi/${doi}`);
    return data;
};
