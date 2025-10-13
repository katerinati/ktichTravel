import {makeAutoObservable} from "mobx";
import ApiService from "../http/index.js";
import $api from "../http/index.js";


 class Auth {
     isUserUnauthorised = false;
    constructor() {
        makeAutoObservable(this)
    }

    async fetchUser() {
        try {
            const res = await $api.get("/users/current");

            console.log(res.data)
        } catch(err) {
            console.log(err)
        }
    }
    handleUnauthorised() {
        this.isUserUnauthorised = true
    }

}

export default new Auth()