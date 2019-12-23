import axios from 'axios';
import { useEffect, useState } from 'react';

type Categories = 'articles' | 'blogposts' | 'videos' | 'books';

export const useResource = (url: string) => {
    const [resources, setResources] = useState({} as any);
    const [error, setError] = useState([]);

    useEffect(() => {
        (async function() {
            const response = await axios.get(url);
            setResources(response.data.data);
        })();
    }, [url]);

    const create = async (data: String, endpoint: Categories) => {
        try {
            const { data: response }: any = await axios.post(`${url}/${endpoint}`, data);
            const updatedResources = { ...resources };
            updatedResources[endpoint] = updatedResources[endpoint].concat(response.data);
            setResources(updatedResources);
            return response.data;
        } catch (error) {
            setError(error);
        }
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
        create,
        remove,
    };

    return [resources, service, error];
};
