import React, {useEffect} from 'react';
import {Outlet, useSearchParams} from "react-router-dom";

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

    const {langId, filterByGenre, searchString, page} = useSelector(state => state.movies);
    const dispatch = useDispatch()

    const [query, setQuery] = useSearchParams({lang: '1', genres: '', search: '', page: '1'});


    // dispatch(setFilterByGenre(query.get('genres')))
    // dispatch(setLangId(query.get('lang')))
    // dispatch(setPage(query.get('page')))


    useEffect(() => {
        dispatch(movieAction.getGenres({langId: query.get('lang')}))
    }, [dispatch, query])

    useEffect(() => {

        if (query.get('search')||searchString) {
            dispatch(movieAction.searchMovies(
                {
                    search:query.get('search'),
                    page: query.get('page'),
                    langId: query.get('lang'),
                }
            ))

        } else
        {
            dispatch(movieAction.discoverMovies(
                {
                    page: query.get('page')||page,
                    langId: query.get('lang')||langId,
                    filterByGenre: query.get('genres')||filterByGenre
                }
            ))
        }


    }, [dispatch, query])

    return (
        <ThemeProvider theme={theme}>
            <div className={css.Main}>
                <Header query={query} setQuery={setQuery}/>
                <Outlet context={[query, setQuery]}/>
            </div>
        </ThemeProvider>
    );
};

export {MainLayout};