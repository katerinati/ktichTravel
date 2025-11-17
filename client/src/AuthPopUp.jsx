import React, {useCallback, useState} from 'react';
import auth from "./store/auth.js";
import styles from "./styles/Auth.module.css"


const AuthPopUp = ({isVisible, changePopupVisible}) => {
    const [loginForm, setLoginForm] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formDataLogIn, setFormDataLogIn] = useState({
        email: '',
        password: ''
    });
    const handleChangeOnSignUp = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});

    }
    const handleChangeLogIn = (e) => {
        const {name, value} = e.target;
        setFormDataLogIn({...formDataLogIn, [name]: value});
    }
    const handleSubmitOnSignUp = useCallback((e) => {
        e.preventDefault()
        if (formData.email.includes('@') && formData.password.length >= 8) {
            auth.signUserUp(formData)
            changePopupVisible(!isVisible)

        } else {
            alert('Заполни как надо')
        }
    }, [formData])

    const handleSubmitOnLogin = useCallback(e => {
        e.preventDefault()
        if (formDataLogIn.email.includes('@') && formDataLogIn.password.length >= 8) {
            auth.loginUser(formDataLogIn)
            changePopupVisible(!isVisible)

        } else {
            alert('Заполни как надо')
        }
    }, [formDataLogIn])

    const handleClickOnClose = useCallback(e => {
        e.preventDefault()
        changePopupVisible(!isVisible)
    }, [isVisible])
    const handleAuthStatusClick = useCallback(e => {
        e.preventDefault()
        setLoginForm(!loginForm)
    }, [loginForm])
    return (
        <div className={isVisible ? styles.authPopUp : styles.hidden}>
            <div className={styles.wrapper}>

                {loginForm
                    ?
                    <div>
                        <form onSubmit={handleSubmitOnLogin}>
                            <input
                                type="email"
                                name="email"
                                className={styles.inputMain}
                                value={formDataLogIn.email}
                                placeholder="Email"
                                onChange={handleChangeLogIn}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className={styles.inputMain}
                                value={formDataLogIn.password}
                                onChange={handleChangeLogIn}
                            />
                            <button className={styles.signUpBtn}>залогинен</button>
                        </form>
                    </div>

                    :
                    <div>
                        <form onSubmit={handleSubmitOnSignUp}>
                            <input
                                type="email"
                                name="email"
                                className={styles.inputMain}
                                value={formData.email}
                                placeholder="Email"
                                onChange={handleChangeOnSignUp}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className={styles.inputMain}
                                name="password"
                                value={formData.password}
                                onChange={handleChangeOnSignUp}
                            />
                            <button className={styles.signUpBtn}>зарегаться</button>
                        </form>
                    </div>
                }
                <a className={styles.switchAuthStatus} onClick={handleAuthStatusClick}>{loginForm ? "Зарегистрироваться" : "Уже есть аккаунт?"}</a>

                <button className={styles.closeBtn} onClick={handleClickOnClose}/>
                    {/*<div className={styles.close}/>*/}
                {/*</button>*/}
            </div>

        </div>
    );
};

export default AuthPopUp;