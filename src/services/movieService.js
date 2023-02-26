import {apiService} from "./apiService";
import {accessToken, lang, urls} from "../configs";


const movieService = {
    discoverMovie: (page, langId, filterByGenre) =>
        apiService.get(urls.movie.movies,
            {
                params:
                    {
                        page: page,
                        language: lang[langId],
                        with_genres: filterByGenre,
                        sort_by: 'popularity.desc'
                    }
            }),

    searchMovie: (searchString, page, langId) =>
        apiService.get(urls.movie.search, {params: {query: searchString, page: page, language: lang[langId]}}),

    genres: (langId) => apiService.get(urls.movie.genres, {params: {language: lang[langId]}}),

    movieDetailsByID: (movieId, langId) =>
        apiService.get(urls.movie.detailsById(movieId), {params: {language: lang[langId]}}),

    videosById: (movieId, langId) =>
        apiService.get(urls.movie.videosById(movieId), {params: {language: lang[langId]}}),

    cast: (movieId, langId) =>
        apiService.get(urls.movie.cast(movieId), {params: {language: lang[langId]}}),
}

apiService.interceptors.request.use((config) => {

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

export {
    movieService
}