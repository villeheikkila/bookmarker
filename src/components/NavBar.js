import React from 'react'
import { Button } from 'semantic-ui-react'

export const NavBar = ({ selected, setSelected }) => {
    return (
        <div style={{ widht: '100%', backgroundColor: '#fef6fb', height: 50 }}>
            <div style={{ textAlign: 'center' }}>
                <Button style={selected > 3 || selected < 0 ? styles.selectedButton : styles.Button} onClick={() => setSelected(10)}>All</Button>
                <Button style={selected === 0 ? styles.selectedButton : styles.Button} onClick={() => setSelected(0)}>Book</Button>
                <Button style={selected === 1 ? styles.selectedButton : styles.Button} onClick={() => setSelected(1)}>Video</Button>
                <Button style={selected === 2 ? styles.selectedButton : styles.Button} onClick={() => setSelected(2)}>Article</Button>
                <Button style={selected === 3 ? styles.selectedButton : styles.Button} onClick={() => setSelected(3)}>Blog</Button>
            </div>
        </div>
    )
}

const styles = {
    Button: {
        margin: 10,
        backgroundColor: '#e6b2c6'
    },
    selectedButton: {
        margin: 10,
        backgroundColor: '#d77fa1'
    }
}