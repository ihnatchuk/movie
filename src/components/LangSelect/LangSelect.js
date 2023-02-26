import React from 'react';
import {MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {setLangId} from "../../redux";

const LangSelect = ({setQuery}) => {
    const {langId, darkTheme}=useSelector(state => state.movies)
    const dispatch = useDispatch();

    const handleChange = (event, value) => {
        dispatch(setLangId(value.props.value))

        setQuery(query=> (
            {
                lang:value.props.value,
                genres:query.get('genres')||'',
                search:query.get('search')||'',
                page:query.get('page')||'1',
            })
        )
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