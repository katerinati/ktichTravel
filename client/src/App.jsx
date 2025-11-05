import Home from "./Home.jsx";
import {useEffect} from "react";
import properties from "./store/properties.js";
import auth from "./store/auth.js";
import Header from "./Header.jsx";

function App() {
    useEffect(() => {
        properties.fetchProperties()
        const res = auth.fetchUser()
        console.log(res)
    }, []);
    return (
        <div >
            <Header/>
            <Home/>

        </div>
    )
}

export default App
