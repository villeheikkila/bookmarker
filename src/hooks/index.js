import axios from 'axios'
import { useState } from 'react'
export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return [{
        type,
        value,
        onChange,
    }, reset]
}

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
    }

    const create = async (data, endpoint) => {
        try {
            const newResource = await axios.post(url + "/" + endpoint, data)
            const updatedResources = {...resources}
            updatedResources[endpoint] = updatedResources[endpoint].concat(newResource.data)
            setResources(updatedResources)
            setError(false);
        } catch (error) {
            setError(true);
        }
    }

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
    }

    const service = {
        init,
        create,
        getAll,
    }

    return [resources, service, error, loading,]
}