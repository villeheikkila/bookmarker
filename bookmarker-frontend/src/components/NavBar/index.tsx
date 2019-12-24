import React from 'react';
import { Button } from 'semantic-ui-react';
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
    navBar: {
        width: 'auto', 
        backgroundColor: '#fef6fb', 
        height: 50, 
        display: 'inline'
    },
    buttonRow: {
        textAlign: 'center'
    }
})

const styles = {
    Button: {
        margin: 10,
        backgroundColor: '#e6b2c6',
    },
    selectedButton: {
        margin: 10,
        backgroundColor: '#d77fa1',
    }
}
  

export const NavBar = ({ selected, setSelected }: any) => {
    const classes = useStyles()
    const navButtonClicked = (index: Number) => {
        setSelected(index);
    };

    return (
        <div className={classes.navBar}>
            <div className={classes.buttonRow}>
                <Button
                    style={selected > 3 || selected < 0 ? styles.selectedButton : styles.Button}
                    onClick={() => navButtonClicked(-1)}
                >
                    All
                </Button>
                <Button
                    style={selected === 0 ? styles.selectedButton : styles.Button}
                    onClick={() => navButtonClicked(0)}
                >
                    Book
                </Button>
                <Button
                    style={selected === 1 ? styles.selectedButton : styles.Button}
                    onClick={() => navButtonClicked(1)}
                >
                    Video
                </Button>
                <Button
                    style={selected === 2 ? styles.selectedButton : styles.Button}
                    onClick={() => navButtonClicked(2)}
                >
                    Article
                </Button>
                <Button
                    style={selected === 3 ? styles.selectedButton : styles.Button}
                    onClick={() => navButtonClicked(3)}
                >
                    Blog
                </Button>
            </div>
        </div>
    );
};