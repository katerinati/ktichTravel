import Home from "./Home.jsx";
import {useEffect} from "react";
import properties from "./store/properties.js";
import auth from "./store/auth.js";
import Header from "./Header.jsx";
import {Route, Routes} from "react-router-dom";
import Profile from "./Profile.jsx";

function App() {
    useEffect(() => {
        properties.fetchProperties()
        const res = auth.fetchUser()
        console.log(res)
    }, []);
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>

            </Routes>

        </div>
    )
}

export default App
