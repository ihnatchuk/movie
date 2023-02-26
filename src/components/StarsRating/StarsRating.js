import React from 'react';
import {Rating} from "@mui/material";

const StarsRating = ({rating}) => {
    return (
        <div>
            <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly/>
        </div>
    );
};

export {StarsRating};
