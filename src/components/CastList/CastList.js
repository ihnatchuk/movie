import React from 'react';

import {Cast} from "../Cast";
import css from './CastList.module.css'
import classNames from "classnames/bind";
import {useSelector} from "react-redux";

const CastList = ({cast}) => {
    const {darkTheme}=useSelector(state => state.movies)

    let cx = classNames.bind(css);
    const CastListClass = cx(
        {
            'CastList': true,
            'CastListLight': !darkTheme,
            'CastListDark': darkTheme
        })


    return (
        <div className={CastListClass}>
            {
                cast.slice(0,5).map((actor)=><Cast key={actor.cast_id} actor={actor}/>)
            }
        </div>
    );
};

export {CastList};