import './App.css'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {ToastContainer} from "react-toastify";
import NavBar from "./components/UI/NavBar/NavBar.tsx";
import {CssBaseline} from "@mui/material";
import Places from "./features/places/components/Places.tsx";
import FullInfoPlaces from "./features/places/components/FullInfoPlaces.tsx";


const App = () => {

    return (
        <>
            <CssBaseline/>
            <ToastContainer/>
            <NavBar/>
            <Routes>
                <Route path='/' element={(<Places/>)}/>
                <Route path='/register' element={(<Register/>)}/>
                <Route path='/login' element={(<Login/>)}/>
                <Route path='/:id/places' element={(<FullInfoPlaces/>)}/>
                <Route path='/*' element={<h1>Page not found</h1>}/>
            </Routes>
        </>
    )
};

export default App
