import React from 'react';

import {urls} from "../../configs";
import css from './Poster.module.css'

const PosterPreview = ({size, path}) => {
    const sizeForRequest=size<350?300:500
    const height=size*3/2
    const posterPath=`${urls.image.poster(sizeForRequest,path)}`
    const mySizes={
        width:size+'px',
        height:height+'px',
    }


    return (
        <div className={css.Poster} style={mySizes}>
            <img style={mySizes} src={posterPath} alt=""/>
        </div>
    );
};

export {PosterPreview};