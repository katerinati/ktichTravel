import React, {useCallback, useState} from 'react';
// import styles from "./styles/Auth.module.css";
import auth from "./store/auth.js";
import Header from "./Header.jsx";
import styles from "./styles/Profile.module.css";
import {observer} from "mobx-react-lite";

const Profile = observer(() => {
    const [showForm, setShowForm] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        dreamCountry: ""
    })

    const handleClick = useCallback(() => {
        setShowForm(!showForm);
    }, [showForm]);

    const setActiveClass = useCallback(() => {
        setActiveMenu(!activeMenu)
    },[activeMenu]);
    const handleDataOnChange = (e) => {
       const {name, value} = e.target;
       setFormData({...formData, [name]: value})
    }
    const handleDataOnSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('here', formData)
        if (formData.firstName.length > 0 || formData.lastName.length > 0 || formData.age.length > 0 || formData.dreamCountry.length > 0 ) {
            console.log("boo", formData)
            auth.updateUser(formData)
        }


    }, [formData])
    return (
        <div className={styles.wrapper}>
            <div className={styles.leftMenu}>
                <h1>Профиль</h1>
                <ul className={styles.menuList}>
                    <li>
                        <button onClick={setActiveClass} className={activeMenu ? styles.active : styles.menuBtn}>Обо мне</button>
                    </li>
                    <li>
                        <button onClick={setActiveClass} className={activeMenu ? styles.active : styles.menuBtn }>Прошлые поездки</button>
                    </li>
                </ul>

            </div>
            <div className={styles.rightMenu}>
                <h1>Обо мне</h1>
                <button className={styles.editBtn} onClick={handleClick}>Редактировать</button>
                <div className={styles.avatarSmall}></div>
                <div>{auth.currentUserData?.email}</div>
                {auth.currentUserData?.isActivated
                    ?
                    <p>Профиль подтвержден</p>
                    :
                    <p>Пожалуйста перейдите по ссылке в письме,<br/> чтобы подтвердить профиль</p>
                }
                {showForm
                    &&
                    <form onSubmit={handleDataOnSubmit}>
                        <input type="text" placeholder="Имя"  name="firstName" onChange={handleDataOnChange}/>
                        <input type="text" placeholder="Фамилия" name="lastName" onChange={handleDataOnChange}/>
                        <input type="text" placeholder="Возраст" name="age" onChange={handleDataOnChange}/>
                        <input type="text" name="dreamCountry" placeholder="В какой стране мечтаю побывать" onChange={handleDataOnChange}/>
                        <button>Готово</button>
                    </form>
                }

            </div>
        </div>
    );
});

export default Profile;