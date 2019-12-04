import React from 'react';
import Loader from 'react-loader-spinner'

// https://www.npmjs.com/package/react-loader-spinner
export const OwnLoader = () => {
    return(
        <Loader 
            type="Bars"
            color="orange"
            height={50}
            width={50}
            style={{textAlign:'center'}}
        />
    )
}