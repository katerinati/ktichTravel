import Home from "./Home.jsx";
import {useEffect} from "react";
import properties from "./store/properties.js";
import auth from "./store/auth.js";

function App() {
    useEffect(() => {
        properties.fetchProperties()
        const res = auth.fetchUser()
        console.log(res)
    }, []);
    return (
        <div >
            <Home/>

        </div>
    )
}

export default App
