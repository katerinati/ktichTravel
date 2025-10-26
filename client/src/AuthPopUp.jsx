import React, {useCallback, useState} from 'react';
import auth from "./store/auth.js";

//@todo перенести на react hook form

const AuthPopUp = () => {
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
        console.log(formData);

    }
    const handleChangeLogIn = (e) => {
        const {name, value} = e.target;
        setFormDataLogIn({...formDataLogIn, [name]: value});
        console.log("jjj")
    }
    const handleSubmitOnSignUp = useCallback((e) => {
        e.preventDefault()
        if (formData.email.includes('@') && formData.password.length >= 8) {
            auth.signUserUp(formData)
        } else {
            alert('Заполни как надо')
        }
        console.log(e)
    }, [formData])

    const handleSubmitOnLogin = useCallback(e => {
        e.preventDefault()
        if (formDataLogIn.email.includes('@') && formDataLogIn.password.length >= 8) {
            auth.loginUser(formDataLogIn)
        } else {
            alert('Заполни как надо')
        }
        console.log(e)
    }, [formDataLogIn])
    return (
        <div>
            <div>
                <form onSubmit={handleSubmitOnSignUp}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChangeOnSignUp}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChangeOnSignUp}
                    />
                    <button className={"signUp"}>зарегаться</button>
                </form>
            </div>
            <div>
                <form onSubmit={handleSubmitOnLogin}>
                    <input
                        type="email"
                        name="email"
                        value={formDataLogIn.email}
                        placeholder="Email"
                        onChange={handleChangeLogIn}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formDataLogIn.password}
                        onChange={handleChangeLogIn}
                    />
                    <button className={"login"}>залогинен</button>
                </form>
            </div>
        </div>
    );
};

export default AuthPopUp;