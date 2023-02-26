import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";

import {MovieDetailsPage, MoviePage, NotFoundPage} from "./pages";
import {MainLayout} from "./layouts";

function App() {

    return (
        <div className="App">

            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'movies'}/>}/>
                    <Route path={'movies'} element={<MoviePage/>}/>
                    <Route path={'/details/:movieId'} element={<MovieDetailsPage/>}/>
                </Route>

                <Route path={'*'} element={<NotFoundPage/>}/>

            </Routes>
        </div>
    );
}

export default App;
