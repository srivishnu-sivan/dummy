import { defineStore, acceptHMRUpdate } from 'pinia'
import Cookies from 'js-cookie';
import axios from 'axios';
import { themeStore } from "../stores/theme";
export const sessionStore = defineStore('user', {
    state: () => ({
        user: null,
        loggedIn: false,
        mescmanagerRole: false,
        collectorRole: false,
        meschandlerRole: false,
        loginError: ''
    }),
    actions: {
        async login(data) {
            const theme = themeStore();
            try {
                const response = await axios.post(
                  "http://106.51.74.69:8787/users/bd-manager/login/",
                  data
                );
                console.log(response.data.token);
                Cookies.set('user', JSON.stringify(response.data))
                // set { domain: '.qspiders.com' } on launch
                const groups = response.data.groups
                const result = groups.some(element => {
                    if (element.name === "BD-Manager") {
                        this.mescmanagerRole = true
                    }
                    else {
                        return false
                    }
                });

                this.$patch({
                    user: response.data,
                    loggedIn: true,
                    loginError: ''
                })
                return this.loggedIn
            } 
            catch (err) {
                theme.pushMessage("Unable to login with provided credentials")
            }
        },

        async logout() {
            const token = this.user.token
            const data = {}
            if (token) {
                const headers = {
                    'Authorization': `Token ${token}`
                }

                try {
                    Cookies.remove('user')
                    // , { domain: '.qspiders.com' }
                    this.$patch({
                        user: null,
                        loggedIn: false,
                        loginError: ''
                    })
                    await axios.post(
                      "http://106.51.74.69:8787/users/logout/",
                      data,
                      {
                        headers: headers,
                      }
                    );
                    return true
                }
                catch (err) {
                    return false
                }
            }
        },

        async checkUser() {
            const theme = themeStore();
            if (this.user === null) {
                if (Cookies.get('user')) {
                    const data = JSON.parse(Cookies.get("user"));
                    // , { domain: '.qspiders.com' }
                    const groups = data.groups
                    const result = groups.some(element => {
                        if (element.name === "BD-Manager") {
                          this.mescmanagerRole = true;
                          return true;
                        } else {
                          return false;
                        }
                    });
                    if (result) {
                        this.$patch({
                            user: data,
                            loggedIn: true,
                            loginError: ''
                        })
                    }
                    else {
                        theme.pushMessage("You do not have permission to enter this role/domain.")
                    }

                }
            }
        }

        
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(sessionStore, import.meta.hot))
}