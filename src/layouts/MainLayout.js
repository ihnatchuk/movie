import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";

import css from './MainLayout.module.css'
import {useDispatch, useSelector} from "react-redux";
import {movieAction} from "../redux";
import {createTheme, ThemeProvider} from "@mui/material";
import {Header} from "../components";

const MainLayout = () => {

    const theme = createTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#aa0000',
                dark: '#880000',
                contrastText: '#fff',
            },
            contrastThreshold: 4.5,
        },
    });

    const {langId} = useSelector(state => state.movies);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(movieAction.getGenres({langId}))
    }, [dispatch, langId])

    return (
        <ThemeProvider theme={theme}>
            <div className={css.Main}>
                <Header/>
                <Outlet/>
            </div>
        </ThemeProvider>
    );
};

export {MainLayout};