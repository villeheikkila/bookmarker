import React, { useState } from 'react';
import { BlogForm } from './saving_forms/BlogForm';
import { BookForm } from './saving_forms/BookForm';
import { VideoForm } from './saving_forms/VideoForm';

export const CreateForm = ({ itemService }) => {

    const [selected, setSelected] = useState(0)

    const buttonClicked = (type) => {
        setSelected(type)
    }

    return(
        <div>
            <div style={{widht:'100%',backgroundColor:'green',height:50}}>
                <div style={{textAlign:'center'}}>
                    <button style={selected === 0 ? styles.selectedButton : styles.button} onClick={()=>buttonClicked(0)}>Book</button>
                    <button style={selected === 1 ? styles.selectedButton : styles.button} onClick={()=>buttonClicked(1)}>Video</button>
                    <button style={selected === 2 ? styles.selectedButton : styles.button} onClick={()=>buttonClicked(2)}>Article</button>
                    <button style={selected === 3 ? styles.selectedButton : styles.button} onClick={()=>buttonClicked(3)}>Blog</button>
                </div>
            </div>
            {selected === 0 ?
                <BookForm itemService={itemService}/>
            : selected === 1 ?
                <VideoForm itemService={itemService}/>
            : selected === 2 ?
                <BlogForm itemService={itemService}/>
            :
                <BlogForm itemService={itemService}/>}
        </div>
    )

}


const styles = {
    button: {
        margin: 10,
        backgroundColor: 'yellow'
    },
    selectedButton: {
        margin: 10,
        backgroundColor: 'orange'
    }
}