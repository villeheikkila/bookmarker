import { useState } from 'react'
export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = (value = '') => {
        setValue(value)
    }

    return [{
        type,
        value,
        onChange,
    }, reset]
}