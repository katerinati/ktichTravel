import React, {useCallback, useState} from 'react';
import auth from "./store/auth.js";
import AuthPopUp from "./AuthPopUp.jsx";
import styles from "./styles/Header.module.css"
import {observer} from "mobx-react-lite";
import ProfileMenu from "./ProfileMenu.jsx";
import {Link} from "react-router-dom";


const Header = observer(() => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [profileMenuVisible, setProfileMenuVisible] = useState(false);
    const showPopUp = useCallback(() => {
        setPopupVisible(!popupVisible);
    }, [popupVisible])

    const showProfileMenu = useCallback(() => {
        setProfileMenuVisible(!profileMenuVisible);
    }, [profileMenuVisible])

    return (
        <div className={styles.wrapper}>
            <Link to="/">
                <div className={styles.logo}/>
            </Link>

            {auth.currentUserData?.email.length > 0 && auth.currentUserData.email.length !== undefined
                ?
                <div onClick={showProfileMenu}>
                    {profileMenuVisible
                        ?
                        <ProfileMenu/>
                        :
                        <div className={styles.avatar}/>

                    }
                </div>
                :
                <button className={styles.authBtn} onClick={showPopUp}>Войти/Зарегистрироваться</button>

            }
            <AuthPopUp isVisible={popupVisible} changePopupVisible={setPopupVisible}/>
        </div>
    );
});

export default Header;