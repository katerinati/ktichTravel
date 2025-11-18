import {makeAutoObservable} from "mobx";
import ApiService from "../http/index.js";
import $api from "../http/index.js";


 class Auth {
     isUserUnauthorised = true;
     currentUserData = null;
    constructor() {
        makeAutoObservable(this)
    }

    async fetchUser() {
        try {
            const res = await $api.get("/users/current");
            this.currentUserData = res.data;
            this.isUserUnauthorised = false;

            console.log(res.data)
        } catch(err) {
            console.log(err)
        }
    }
    handleUnauthorised() {
        this.isUserUnauthorised = true
    }
    async signUserUp(userData) {
            try {
                   const res = await $api.post("/registration", userData);
                   console.log(res.data)
            } catch (err) {
                console.log(err)
            }
    }
    async loginUser(userData) {
        try {
            const res = await $api.post("/login", userData);
            localStorage.setItem("token", res.data.accessToken);
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    async updateUser(userData) {
            try {

                const res = await $api.patch("/profile", userData);
                console.log('now', userData, this.currentUserData.id);
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
    }

}

export default new Auth()