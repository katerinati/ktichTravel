import Home from "./Home.jsx";
import {useEffect} from "react";
import properties from "./store/properties.js";

function App() {
    useEffect(() => {
        properties.fetchProperties()
    }, []);
    return (
        <div >
            <Home/>

        </div>
    )
}

export default App
