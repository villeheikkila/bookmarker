const knex = require('../connection');

interface Video {
    title: string;
    url: string;
    author: string;
    localDate: Date;
    year: number;
    comment: string;
    related: string;
}

const getAllVideos = () => {
    return knex('videos').select('*');
};

const getSingleVideo = (id: string) => {
    return knex('videos')
        .select('*')
        .where({ id: parseInt(id) });
};

const addVideo = (video: Video) => {
    return knex('videos')
        .insert(video)
        .returning('*');
};

const updateVideo = (id: string, video: Video) => {
    return knex('videos')
        .update(video)
        .where({ id: parseInt(id) })
        .returning('*');
};

const deleteVideo = (id: string) => {
    return knex('videos')
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
};

module.exports = {
    getSingleVideo,
    getAllVideos,
    addVideo,
    updateVideo,
    deleteVideo,
};

export {};
