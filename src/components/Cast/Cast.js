import React from 'react';

import {PosterPreview} from "../PosterPreview"
import css  from './Cast.module.css'

const Cast = ({actor}) => {
    const { name, profile_path }=actor
    return (
        <div className={css.Cast}>
            <PosterPreview size={120} path={profile_path}/>
            <div>{name}</div>
        </div>
    );
};

export {Cast};