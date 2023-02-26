import React from 'react';
import { useSelector } from "react-redux";

import {MoviesListCard} from "../MoviesListCard";
import css from './MoviesList.module.css'


const MoviesList = () => {
    const {movies} = useSelector(state => state.movies);

    return (
        <div>
            <div className={css.MoviesList}>
                {
                    movies.map(movie => <MoviesListCard key={movie.id} movie={movie}/>)
                }
            </div>

        </div>
    );
};

export {MoviesList};