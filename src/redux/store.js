import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {movieReducer} from "./slices/movieSlice";

const rootReducer=combineReducers({
    movies:movieReducer
})

const storeSetup=()=>configureStore({
    reducer:rootReducer
})

export{
    storeSetup
}
