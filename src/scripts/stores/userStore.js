import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

import router from '@/scripts/router'

import { userFirebaseService } from '../services/firebase/userFirebaseService'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ('user', {
        _isAuthenticated: useLocalStorage('user/auth', false),
        _uid: useLocalStorage('user/uid', ''),
        _appID: useLocalStorage('user/app', ''),
        _username: 'custom username'
    }),
    getters: {
        // IS
        isAuthenticated(state) {
            return state._isAuthenticated
        },

        // GET
        id(state) {
            return state._uid ? state._uid : null;
        },

        // HAS
    },
    actions: {
        async login(user){
            let db_user = await userFirebaseService.login(user);
            // Update user informations in store
            if(db_user && db_user.uid){
                this._isAuthenticated = true;
                this._uid = db_user.uid;
                this._appID = db_user.bax.id;
                router.push('/')
            }
        },
        logout() {
            this._isAuthenticated = false;
            this._uid = null;
            router.push('/login')
        }
    }
})