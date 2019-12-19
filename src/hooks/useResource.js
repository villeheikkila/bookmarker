import axios from 'axios';
import { useState } from 'react';

export const useResource = url => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const init = () => {
        if (!isLoaded) {
            getAll();
            setLoaded(true);
        }
    };

    const create = async (data, endpoint) => {
        try {
            const newResource = await axios.post(`${url}/${endpoint}`, data);
            const updatedResources = { ...resources };
            updatedResources[endpoint] = updatedResources[endpoint].concat(newResource.data);
            setResources(updatedResources);
            setError(false);
            return newResource;
        } catch (error) {
            setError(true);
        }
    };

    const getAll = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setResources(response.data);
            setError(false);
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    const remove = async (id, endpoint) => {
        try {
            await axios.delete(`${url}/${endpoint}/${id}`);
            const removeEntry = resources[endpoint].filter(e => e.id !== id);
            const updatedResources = { ...resources, [endpoint]: removeEntry };
            setResources(updatedResources);

            setError(false);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    const service = {
        init,
        create,
        remove,
        getAll,
    };

    return [resources, service, error, loading];
};
