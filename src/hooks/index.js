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
    const [resources, setResources] = useState([])

    const create = async data => {
        const newResource = await axios.post(url, data)
        const updatedResources = resources.concat(newResource.data)
        setResources(updatedResources)
    }

    const getAll = async () => {
        const response = await axios.get(url)
        setResources(response.data)
    }

    const service = {
        create,
        getAll
    }

    return [resources, service]
}