import React, {useCallback} from 'react';
import AuthPopUp from "./AuthPopUp.jsx";
import auth from "./store/auth.js";

const Login = () => {

    return (
        <div>
           <AuthPopUp isVisible={auth.isUserUnauthorised} changePopupVisible={() => auth.isUserUnauthorised} />
        </div>
    );
};

export default Login;