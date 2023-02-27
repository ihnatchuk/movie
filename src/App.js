import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";

import {MovieDetailsPage, MoviePage, NotFoundPage, SearchPage} from "./pages";
import {MainLayout} from "./layouts";

function App() {

    return (
        <div className="App">

            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'movies/0/1/1'}/>}/>
                    <Route path={'movies/:genre/:lang/:page'} element={<MoviePage/>}/>
                    <Route path={'/search/:query/:lang/:page'} element={<SearchPage/>}/>
                    <Route path={'/details/:movieId/:lang'} element={<MovieDetailsPage/>}/>
                </Route>

                <Route path={'*'} element={<NotFoundPage/>}/>

            </Routes>
        </div>
    );
}

export default App;
