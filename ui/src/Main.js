
import React, { useState, Fragment } from 'react';
import Login from './Login';
import App from './App';
import {ThemeProvider, createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FA9C1D',
        },
        secondary: {
            main: '#4A4C4E',
        },
        info: {
            main: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: 'Lato',
    },
    shape: {
        borderRadius: 4,
    },
});

const logout = (setUser) => {
    return () => {
        setUser(undefined);
    }
};

export default function Main() {

    const [user, setUser] = useState(undefined);

    return (
        <ThemeProvider theme={theme}>
        <Fragment>
            {
                user !== undefined ? (
                    <App user={user} logoutAction={logout(setUser)} />
                ) : (
                    <Login user={user} setUser={setUser} />
                )
            }
        </Fragment>
        </ThemeProvider>
    )

}