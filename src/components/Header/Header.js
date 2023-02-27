import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import css from './Header.module.css'
import {setFilterByGenre, setPage, setSearchString} from "../../redux";
import {SwitchTheme} from "../SwitchTheme";
import classNames from "classnames/bind";
import {wordsLang as textLang} from "../../configs/textLang";
import {LangSelect} from "../LangSelect";
import {GenresMenu} from "../GenresMenu";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {langId, searchString, darkTheme} = useSelector(state => state.movies)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoClick=()=>{
        dispatch(setSearchString(''))
        navigate('/movies/0/1/1')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const searchString = form.search.value;
        dispatch(setSearchString(searchString))
        dispatch(setFilterByGenre('0'))
        dispatch(setPage(1))
        if (!!searchString) {
            navigate(`/search/${searchString}/${langId}/1`)
        } else {
            navigate(`/movies/0/${langId}/1`)
        }
    }

    let cx = classNames.bind(css);
    const HeaderLayoutClass = cx(
        {
            'HeaderLayout': true,
            'HeaderLayoutLight': !darkTheme,
            'HeaderLayoutDark': darkTheme
        })

    const searchButtonClass = cx(
        {
            'searchButton': true,
            'searchButtonLight': !darkTheme,
            'searchButtonDark': darkTheme
        })
    const inputClass = cx(
        {
            'input': true,
            'inputLight': !darkTheme,
            'inputDark': darkTheme
        })

    return (
        <div className={HeaderLayoutClass}>
            <div className={css.Header}>

                <div className={css.leftHeader}>
                    <div className={css.logo} onClick={()=>logoClick()}>
                        <img src={require("../../img/m4u.png")} alt=""/>
                    </div>

                    {
                        !searchString &&
                        <div className={css.GenreMenuSize}>
                            <GenresMenu/>
                        </div>
                    }

                </div>

                <div className={css.searchForm}>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className={css.inputs}>
                            <input
                                type="search"
                                name="search"
                                value={searchString}
                                onChange={e => dispatch(setSearchString(e.target.value))}
                                className={inputClass}
                                placeholder={textLang.Search[langId]}
                            />
                            <input
                                className={searchButtonClass}
                                type="submit"
                                value={textLang.Search[langId]}
                            />
                        </div>

                    </form>
                </div>


                <div className={css.userIconAndLang}>
                    <SwitchTheme/>
                    <LangSelect/>
                    <AccountCircleIcon sx={{fontSize: 40, color: 'white'}}/>
                </div>

            </div>
        </div>

    );
};

export {Header};