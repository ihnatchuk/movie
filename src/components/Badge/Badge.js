import React from 'react';

import css from './Badge.module.css'
import classNames from "classnames/bind";
const Badge = ({text, darkTheme}) => {
    let cx = classNames.bind(css);
    const BadgeClass = cx(
        {
            'Badge': true,
            'BadgeLight': !darkTheme,
            'BadgeDark': darkTheme
        })
    return (
        <span className={BadgeClass}>
            {text}
        </span>
    );
};

export {Badge};