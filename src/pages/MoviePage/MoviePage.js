import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "@mui/material";
import classNames from "classnames/bind";
import {useNavigate, useParams} from "react-router-dom";

import {MoviesList} from "../../components";
import {movieAction, setPage} from "../../redux";
import css from './MoviePage.module.css'

const MoviePage = () => {
    const {langId, filterByGenre, total_pages, darkTheme} = useSelector(state => state.movies);

    const searchQuery=useParams()
    const navigate=useNavigate()

    const dispatch = useDispatch()
    const handleChange = (event, value) => {

        dispatch(setPage(value));
        navigate(`/movies/${filterByGenre}/${langId}/${value}`)
    }

    useEffect(() => {

        dispatch(movieAction.discoverMovies(
            {
                page: searchQuery.page,
                langId: searchQuery.lang,
                filterByGenre: searchQuery.genre==='0'?'':searchQuery.genre
            }
        ))
    }, [dispatch, searchQuery])

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
                    page={+searchQuery.page}
                    count={+total_pages}
                    onChange={handleChange}/>
            </div>
            <MoviesList/>
        </div>
    );
};

export {MoviePage};