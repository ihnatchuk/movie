import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import css from './Header.module.css'
import {setFilterByGenre, setPage, setSearchString} from "../../redux";
import {SwitchTheme} from "../SwitchTheme";
import classNames from "classnames/bind";
import {wordsLang as textLang} from "../../configs/textLang";
import {LangSelect} from "../LangSelect";
import {GenresMenu} from "../GenresMenu";

const Header = ({query, setQuery}) => {

    const [search, setSearch] = useState('')

    const {langId, searchString, darkTheme} = useSelector(state => state.movies)

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const searchString = form.search.value;

        dispatch(setSearchString(searchString))

        setQuery(query => (
            {
                lang: query.get('lang'),
                genres: '',
                search: searchString,
                page: '1',
            })
        )
        dispatch(setFilterByGenre(''))
        dispatch(setPage(1))
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
                    <div className={css.logo} >
                        <img src={require("../../img/m4u.png")} alt=""/>
                    </div>

                    {
                        !searchString&&
                        <div className={css.GenreMenuSize} >
                            <GenresMenu query={query} setQuery={setQuery}/>
                        </div>
                    }


                </div>

                <div className={css.searchForm}>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className={css.inputs}>
                            <input
                                type="search"
                                name="search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
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
                    <LangSelect setQuery={setQuery}/>
                    <AccountCircleIcon sx={{fontSize: 40, color: 'white'}}/>
                </div>

            </div>
        </div>

    );
};

export {Header};