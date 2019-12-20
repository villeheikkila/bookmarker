import axios from 'axios';
import { useState } from 'react';

type Categories = 'articles' | 'blogposts' | 'videos' | 'books';

export const useResource = (url: string) => {
    const [resources, setResources] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    const init = () => {
        if (!isLoaded) {
            getAll();
            setLoaded(true);
        }
    };

    const create = async (data: String, endpoint: Categories) => {
        console.log('TCL: create -> data', data);
        try {
            const newResource = await axios.post(`${url}/${endpoint}`, data);
            console.log('TCL: create -> newResource', newResource);
            const updatedResources = { ...resources };
            updatedResources[endpoint] = updatedResources[endpoint].concat(newResource.data);
            setResources(updatedResources);
            return newResource;
        } catch (error) {
            setError(error);
        }
    };

    const getAll = async () => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setResources(response.data.data);
        } catch (error) {
            console.error(error);
            setError(error);
        }
        setLoading(false);
    };

    const remove = async (id: string, endpoint: Categories) => {
        try {
            await axios.delete(`${url}/${endpoint}/${id}`);
            const removeEntry = resources[endpoint].filter((e: any) => e.id !== id);
            const updatedResources = { ...resources, [endpoint]: removeEntry };
            setResources(updatedResources);
        } catch (error) {
            setError(error);
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
