import './App.css'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {ToastContainer} from "react-toastify";
import NavBar from "./components/UI/NavBar/NavBar.tsx";
import {CssBaseline} from "@mui/material";


const App = () => {

    return (
        <>
            <CssBaseline/>
            <ToastContainer/>
            <NavBar/>
            <Routes>
                <Route path='/register' element={(<Register/>)}/>
                <Route path='/login' element={(<Login/>)}/>
                <Route path='/*' element={<h1>Page not found</h1>}/>
            </Routes>
        </>
    )
};

export default App
