import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "../../services";

let initialState = {
    movies: [],
    genres: [],
    videos:[],
    cast:[],
    movieInfo:null,
    movieDetails:null,
    filterByGenre:'',
    searchString:'',
    isSearching:false,
    langId:1,
    page:1,
    total_pages:null,
    darkTheme:true,
    errors: null
};


const discoverMovies = createAsyncThunk(
    'movieSlice/discoverMovies',
    async ({page,langId,filterByGenre}, thunkAPI) => {
        try {
            const {data} = await movieService.discoverMovie(page,langId,filterByGenre)
            return data
        }catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const searchMovies = createAsyncThunk(
    'movieSlice/searchMovies',
    async ({search, page, langId}, thunkAPI) => {
        try {
            const {data} = await movieService.searchMovie(search, page, langId)
            return data
        }catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const getGenres = createAsyncThunk(
    'movieSlice/getGenres',
    async ({langId}, thunkAPI) => {
        try {
            const {data} = await movieService.genres(langId)
            return data
        }catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const getMovieDetails = createAsyncThunk(
    'movieSlice/getMovieDetails',
    async ({movieId, langId}, thunkAPI) => {
        try {
            const {data} = await movieService.movieDetailsByID(movieId, langId)
            return data
        }catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const getVideos = createAsyncThunk(
    'movieSlice/getVideos',
    async ({movieId, langId}, thunkAPI) => {
        try {
            const {data} = await movieService.videosById(movieId, langId)
            return data
        }catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const getCast = createAsyncThunk(
    'movieSlice/getCast',
    async ({movieId, langId}, thunkAPI) => {
        try {
            const {data} = await movieService.cast(movieId, langId)
            return data
        }catch (e) {
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setPage:(state, action)=>{
            state.page=action.payload
        },

        setLangId:(state, action)=>{
            state.langId=action.payload
        },

        setSearchString:(state, action)=>{
            if (action.payload){
                state.isSearching=true
                state.searchString=action.payload
            }else{
                state.isSearching=false
                state.searchString=''
            }
        },

        setFilterByGenre:(state,action)=>{
            state.filterByGenre=action.payload
            },

        setMovieInfo:(state, action)=>{
            state.movieInfo=action.payload
        },
        changeTheme:(state)=>{
            state.darkTheme=!state.darkTheme
        }

    },
    extraReducers: builder =>
        builder
            .addCase(discoverMovies.fulfilled,(state, action) => {
                const {page,total_pages, results }=action.payload;
                state.page=page;
                state.total_pages=(+total_pages>500)?500:total_pages;
                state.movies=results
            })
            .addCase(searchMovies.fulfilled,(state, action) => {
                const {page,total_pages, results }=action.payload;
                state.page=page;
                state.total_pages=(+total_pages>500)?500:total_pages;
                state.movies=results
            })
            .addCase(getGenres.fulfilled,(state, action) => {
                const { genres }=action.payload;
                state.genres=genres;
            })
            .addCase(getMovieDetails.fulfilled,(state, action) => {
                state.movieDetails=action.payload;
            })
            .addCase(getVideos.fulfilled,(state, action) => {
                const { results }=action.payload;
                state.videos=results;
            })
            .addCase(getCast.fulfilled,(state, action) => {
                const { cast }=action.payload;
                state.cast=cast;
            })


});

const {reducer: movieReducer,
        actions:
            {setPage, setLangId, setSearchString, setFilterByGenre, setMovieInfo,changeTheme}} = movieSlice

const movieAction = {
    discoverMovies,
    searchMovies,
    getGenres,
    getMovieDetails,
    getVideos,
    getCast
}

export {
    movieReducer,
    movieAction,
    setPage,
    setLangId,
    setSearchString,
    setFilterByGenre,
    setMovieInfo,
    changeTheme
}
