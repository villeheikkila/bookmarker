import React from 'react'

export const NavBar = ({ selected, setSelected }) => {
    return (
        <div style={{ widht: '100%', backgroundColor: 'green', height: 50 }}>
            <div style={{ textAlign: 'center' }}>
                <button style={selected > 3 || selected < 0 ? styles.selectedButton : styles.button} onClick={() => setSelected(10)}>All</button>
                <button style={selected === 0 ? styles.selectedButton : styles.button} onClick={() => setSelected(0)}>Book</button>
                <button style={selected === 1 ? styles.selectedButton : styles.button} onClick={() => setSelected(1)}>Video</button>
                <button style={selected === 2 ? styles.selectedButton : styles.button} onClick={() => setSelected(2)}>Article</button>
                <button style={selected === 3 ? styles.selectedButton : styles.button} onClick={() => setSelected(3)}>Blog</button>
            </div>
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