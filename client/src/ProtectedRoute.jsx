import React from 'react';
import {observer} from "mobx-react-lite";
import auth from "./store/auth.js";
import {Navigate} from "react-router-dom";
import Loading from "./Loading.jsx";

const ProtectedRoute = observer(({children}) => {
    console.log('protected route', auth.isUserUnauthorised);
    if(auth.isLoading && auth.isUserUnauthorised) {
        return <Loading />;
    }
    // if (auth.isUserUnauthorised) {
    //     return <Navigate to="/login" />;
    // }

    return children;
});

export default ProtectedRoute;