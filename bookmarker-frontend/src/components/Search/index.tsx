import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { Input } from 'semantic-ui-react';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
    search: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    searchInput: {
        width: "50%"
    },
})

export const Search = ({ label, onSubmit, value}: any) => {
    const classes = useStyles()
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        setValue(label, value )
    }, [value])


    return (
        <div
            className={classes.search}
        >
            <RHFInput
                as={
                    <Input
                        label={label}
                        action={{
                            icon: 'search',
                            onClick: handleSubmit(onSubmit),
                        }}
                        placeholder="Search..."
                        className={classes.searchInput}
                    />
                }
                name={label}
                setValue={setValue}
                register={register}
            />
        </div>
    )
}