import React, {useEffect} from 'react';

import {MovieInfo} from "../../components";
import css from './MovieDetailsPage.module.css'
import classNames from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {movieAction} from "../../redux";

const MovieDetailsPage = () => {

    const {movieId} = useParams();

    const {movieDetails, langId, darkTheme} = useSelector(state => state.movies)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(movieAction.getMovieDetails({movieId, langId}))
        dispatch(movieAction.getVideos({movieId, langId}))
        dispatch(movieAction.getCast({movieId, langId}))
    }, [dispatch, movieId, langId])

    let cx = classNames.bind(css);
    const MovieDetailsPageClass = cx(
        {
            'MovieDetailsPage': true,
            'MovieDetailsPageLight': !darkTheme,
            'MovieDetailsPageDark': darkTheme
        })

    return (
        <div className={MovieDetailsPageClass}>
            {
                !!movieDetails && <MovieInfo movieId={movieId} details={movieDetails} />
            }
        </div>
    );
};

export {MovieDetailsPage};