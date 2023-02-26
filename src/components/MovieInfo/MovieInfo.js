import {useSelector} from "react-redux";
import classNames from "classnames/bind";

import {urls} from "../../configs";
import css from './MovieInfo.module.css'
import {PosterPreview} from "../PosterPreview";
import {Badge} from "../Badge";
import {StarsRating} from "../StarsRating";
import {wordsLang} from '../../configs/textLang'
import {CastList} from "../CastList";

const MovieInfo = ({movieId,details}) => {
    const {
        id,
        title,
        original_title,
        tagline,
        genres,
        release_date,
        runtime,
        vote_count,
        vote_average,
        backdrop_path,
        poster_path,
        budget,
        revenue,
        production_companies,
        overview,
    }=details

    const {videos, cast, langId, darkTheme} = useSelector(state => state.movies)

    let cx = classNames.bind(css);
    const TextInfoClass = cx(
        {
            'TextInfo': true,
            'TextInfoLight': !darkTheme,
            'TextInfoDark': darkTheme
        })
    const backGradientClass = cx(
        {
            'backGradient': true,
            'backGradientLight': !darkTheme,
            'backGradientDark': darkTheme
        })

    return (
        <div className={css.MovieInfo}>

            <div className={css.backdrop}>
                {
                    +movieId === id && <img src={urls.image.poster(1280, backdrop_path)} alt=""/>
                }
            </div>
            <div className={backGradientClass}>

                {+movieId === id &&

                    <div className={css.details}>

                        <div>
                            <PosterPreview size={480} path={poster_path}/>
                        </div>

                        <div className={css.detailsRight}>

                            <div className={TextInfoClass}>
                                <h2 className={css.movieTitle}>{title}</h2>
                                <div className={css.originalTitle}>{original_title}</div>

                                <div className={css.badges}>
                                    {!!genres &&
                                        genres.map(genre =>
                                            <Badge key={genre.id} text={genre.name} darkTheme={darkTheme}/>)
                                    }
                                </div>

                                {
                                    !!tagline && <div>{wordsLang.Tagline[langId]}: {tagline}</div>
                                }

                                <div>
                                    {release_date.split('-')[0]}, Imdb {vote_average}/{vote_count}, {runtime} minutes
                                </div>

                                <StarsRating rating={+vote_average / 2}/>

                                <div>{wordsLang.budget[langId]}:
                                    ${Math.floor(+budget / 10000) / 100}M, {wordsLang.revenue[langId]}:
                                    ${Math.floor(+revenue / 10000) / 100}M
                                </div>

                                <div>
                                    {wordsLang.ProductionCompanies[langId]}:
                                    <div className={css.Companies}>
                                        {
                                            production_companies.map(company =>
                                                <div key={company.id}>{company.name}, {company.origin_country};</div>)
                                        }
                                    </div>
                                </div>

                                <div>{wordsLang.Overview[langId]}:
                                    <div className={css.Overview}>{overview}</div>
                                </div>

                            </div>
                            <div>
                                {wordsLang.acting[langId]}:
                                <CastList cast={cast}/>
                            </div>
                        </div>
                    </div>
                }
            </div>

            { +movieId === id && !!videos.length &&
                <div>
                    <iframe title='Trailer' id="ytplayer" width="1280" height="720" style={{border: 0}}
                            src={`http://www.youtube.com/embed/${videos[0].key}?autoplay=1`}
                    />
                </div>
            }
        </div>
    );
};

export {MovieInfo};