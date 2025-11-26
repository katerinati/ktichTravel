import {makeAutoObservable} from "mobx";
import ApiService from "../http/index.js";
import $api from "../http/index.js";


 class Auth {
     isUserUnauthorised = true;
     currentUserData = null;
     isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    async fetchUser() {
        try {
            this.isLoading = true;
            const res = await $api.get("/users/current");
            this.currentUserData = res.data;

            if (res.status === 200) {
                this.isLoading = false;
                this.isUserUnauthorised = false
            }

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
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
    }
     async addTrip(userData) {
         try {
             console.log('before fetch', userData);
             const res = await $api.patch("/profile/trips", userData);

             console.log(res.data)
         } catch (err) {
             console.log(err)
         }
     }
     async logOut() {
        try {
            const res = await $api.post("/logout");
        } catch (err) {
            console.log(err)
        }
     }

}

export default new Auth()