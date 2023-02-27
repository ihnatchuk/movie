import React from 'react';
import {MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {setLangId} from "../../redux";
import {useNavigate, useParams} from "react-router-dom";

const LangSelect = () => {
    const {langId, darkTheme}=useSelector(state => state.movies)
    const dispatch = useDispatch();
    const searchQuery=useParams()
    const navigate=useNavigate()

    const handleChange = (event, value) => {
        dispatch(setLangId(value.props.value))

        if (searchQuery.genre){
            navigate(`/movies/${searchQuery.genre}/${value.props.value}/${searchQuery.page}`)
        }else if (searchQuery.query){
            navigate(`/search/${searchQuery.query}/${value.props.value}/${searchQuery.page}`)
        }else{
            navigate(`/details/${searchQuery.movieId}/${value.props.value}`)
        }
    };

    return (
        <div>
            <Select
                value={langId}
                onChange={handleChange}
                variant={'standard'}
                sx={{
                    color:darkTheme?'#000':'blue',
                    height:'30px',
                    backgroundColor:'#fff',
                    paddingLeft:'5px'
                }}
            >
                <MenuItem value={0}>En</MenuItem>
                <MenuItem value={1}>Uk</MenuItem>
            </Select>
        </div>
    );
};

export {
    LangSelect
};