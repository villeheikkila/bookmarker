import { useState } from 'react';
export const useField = (type: string) => {
    const [value, setValue] = useState<any>();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const reset = (value: any) => {
        setValue(value);
    };

    return [
        {
            type,
            value,
            onChange,
        },
        reset,
        value,
    ];
};
