import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useDispatch, useSelector} from "react-redux";
import {setFilterByGenre, setPage, setSearchString} from "../../redux";

import {wordsLang as textLang} from "../../configs/textLang";

const ITEM_HEIGHT = 40;

export function GenresMenu({ query, setQuery }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const { genres, searchString, darkTheme, langId} = useSelector(state => state.movies)
    const dispatch = useDispatch()

    const click = (id) => {
        setQuery((query)=>(
            {
                lang:query.get('lang')||langId,
                genres:id,
                search:'',
                page:1}))

        dispatch(setFilterByGenre( id ))
        dispatch(setPage(1))
        document.getElementsByTagName('input')[0].value = ''
        dispatch(setSearchString(''))

        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                disabled={!!searchString}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon/>}
                color={darkTheme ? 'secondary' : 'primary'}
                sx={{height:'30px'}}

            >
                {textLang.Genres[langId]}
            </Button>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 5.5,
                        width: '20ch',
                        backgroundColor: darkTheme ? '#550000' : '#3f50b5'
                    },
                }}
            >
                {
                    genres.map((genre) =>
                            <MenuItem key={genre.id}
                                      selected={genre.id === +query.get('genres')}
                                      onClick={() => click(genre.id)}
                                      sx={{
                                          color: '#fff',
                                          backgroundColor: darkTheme ? '#880000' : 'blue'
                                      }}>
                                {genre.name}
                            </MenuItem>
                    )
                }
            </Menu>
        </div>
    );
}