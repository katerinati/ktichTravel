import React, {useCallback} from 'react';
import styles from './styles/Auth.module.css'
import {observer} from "mobx-react-lite";
import auth from "./store/auth.js";
import {Link} from "react-router-dom";

const ProfileMenu = observer(() => {
    const handleClick = useCallback(() => {
        auth.logOut()
    })
    return (
        <div className={styles.profileMenu}>
            <div className={styles.avatarSmall}></div>
            <div>{auth.currentUserData.email}</div>
            <Link to="/profile">Заполнить профиль</Link>
            <button onClick={handleClick}>Log out</button>
        </div>
    );
});

export default ProfileMenu;