import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "@mui/material";
import classNames from "classnames/bind";

import {MoviesList} from "../../components";
import {movieAction, setPage} from "../../redux";
import css from "./SearchPage.module.css";

const SearchPage = () => {
    const {total_pages, darkTheme} = useSelector(state => state.movies)

    const searchQuery = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleChange = (event, value) => {
        dispatch(setPage(value));
        navigate(`/search/${searchQuery.query}/${searchQuery.lang}/${value}`)
    }


    useEffect(() => {
        dispatch(movieAction.searchMovies(
            {
                search: searchQuery.query,
                page: searchQuery.page,
                langId: searchQuery.lang,
            }
        ))
    }, [dispatch, searchQuery])

    let cx = classNames.bind(css);
    const searchPageClass = cx(
        {
            'searchPage': true,
            'searchPageLight': !darkTheme,
            'searchPageDark': darkTheme
        })
    const paginatClass = cx(
        {
            'pagAlign': true,
            'pagAlignLight': !darkTheme,
            'pagAlignDark': darkTheme
        })
    const paginColor = darkTheme ? 'secondary' : 'primary'

    return (
        <div className={searchPageClass}>
            <div className={paginatClass}>
                <Pagination
                    outlined=''
                    color={paginColor}
                    page={+searchQuery.page}
                    count={+total_pages}
                    onChange={handleChange}/>
            </div>
            <MoviesList/>
        </div>
    );
};

export {SearchPage};