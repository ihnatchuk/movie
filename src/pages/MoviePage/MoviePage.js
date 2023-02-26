import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "@mui/material";
import classNames from "classnames/bind";
import {useOutletContext} from "react-router-dom";

import {MoviesList} from "../../components";
import {setPage} from "../../redux";
import css from './MoviePage.module.css'

const MoviePage = () => {
    const {langId, total_pages, darkTheme} = useSelector(state => state.movies);
    const [query, setQuery] = useOutletContext();

    const dispatch = useDispatch()
    const handleChange = (event, value) => {
        setQuery(query => (
            {
                lang: query.get('lang')||langId,
                genres: query.get('genres')||'',
                search: query.get('search')||'',
                page: value
            })
        )
        dispatch(setPage(value));
    }

    let cx = classNames.bind(css);
    const moviePageClass = cx(
        {
            'moviePage': true,
            'moviePageLight': !darkTheme,
            'moviePageDark': darkTheme
        })
    const paginationClass = cx(
        {
            'pagAlign': true,
            'pagAlignLight': !darkTheme,
            'pagAlignDark': darkTheme
        })
    const paginColor = darkTheme ? 'secondary' : 'primary'

    return (
        <div className={moviePageClass}>
            <div className={paginationClass}>
                <Pagination
                    outlined=''
                    color={paginColor}
                    page={+query.get('page')}
                    count={+total_pages}
                    onChange={handleChange}/>
            </div>
            <MoviesList/>
        </div>
    );
};

export {MoviePage};