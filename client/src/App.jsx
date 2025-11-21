import Home from "./Home.jsx";
import React, {useEffect} from "react";
import properties from "./store/properties.js";
import auth from "./store/auth.js";
import Header from "./Header.jsx";
import {Route, Routes} from "react-router-dom";
import Profile from "./Profile.jsx";
import Property from "./Property.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "./Login.jsx";

function App() {
    useEffect(() => {
        properties.fetchProperties()
        auth.fetchUser()
    }, []);
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/property/:id" element={<ProtectedRoute><Property/></ProtectedRoute>}/>

                </Routes>
            </LocalizationProvider>
        </div>
    )
}

export default App
