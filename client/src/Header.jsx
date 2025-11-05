import React, {useCallback, useState} from 'react';
import auth from "./store/auth.js";
import AuthPopUp from "./AuthPopUp.jsx";
import styles from "./styles/Auth.module.css"
import {observer} from "mobx-react-lite";


const Header = observer(() => {
    const [popupVisible, setPopupVisible] = useState(false);
    const handleClick = useCallback(() => {
        setPopupVisible(!popupVisible);
    }, [popupVisible])


    return (
        <div>

            {auth.currentUserData?.email.length > 0 && auth.currentUserData.email.length !== undefined
                ?
                <div>Профиль</div>
                :
                <button onClick={handleClick}>Войти/зарегистрироваться</button>

            }
                <div>
                    jfjfgj
                </div>

            <AuthPopUp isVisible={popupVisible} changePopupVisible={setPopupVisible} />
        </div>
    );
});

export default Header;