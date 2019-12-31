//import custom axios instance
import axios from '../axios'

const state = {
    authentication : false,
    authUserData: {},
    token: null,
}

const getters= {
    authenticated(state){
        return state.authentication;
    },
    accessToken(){
        return state.token;
    },
    authUser(state){
        return state.authUserData;
    },
    isAdmin(state){
        if(!state.authUserData) return false;
        return state.authUserData.role == 'admin';
    },
    isOwner: (state) => (resourceId) => {
        return state.authUserData.id == resourceId;
    }
}

const mutations = {
    setAuthentication(state, payload){
        state.authentication = payload;
    },
    setAuthUsersData(state, payload){
        state.authUserData = payload;
    },
    setToken(state, payload){
        state.token = payload;
    }
}

const actions = {
    register(context, payload){
        return new Promise((resolve, reject) => {
            axios.post('/register', payload)
              .then(response =>{
                //automatic login
                if(response.data.auth.access_token){
                    localStorage.setItem('auth', JSON.stringify(response.data.auth));
                    context.commit('setAuthentication', true);
                    context.commit('setAuthUsersData', response.data.auth.user);
                    context.commit('setToken', `Bearer ${response.data.auth.access_token}`);
                    resolve(response);
                }else{
                    reject(response);
                }
              })
              .catch((error) => {
                reject(error);
              })
        });
    },
    login(context, payload){
        return new Promise((resolve, reject) => {
            axios.post('/login', payload)
              .then(response =>{
               if(response.data.auth.access_token){
                    localStorage.setItem('auth', JSON.stringify(response.data.auth));
                    context.commit('setAuthentication', true);
                    context.commit('setAuthUsersData', response.data.auth.user);
                    context.commit('setToken', `Bearer ${response.data.auth.access_token}`);
                    resolve(response);
                }else{
                    reject(response);
                }
              })
              .catch(error => {
                reject(error);
              })
        });
    },
    logout(context){
        return new Promise((resolve, reject) => {
            localStorage.removeItem('auth')
            if(localStorage.getItem('auth') === null){
                context.commit('setAuthentication', false);
                context.commit('setAuthUsersData', {});
                context.commit('setToken', null);
                resolve(true);
            }else{
                reject(false);
            }
        });
    },
    // reset state on page refresh
    resetAuthState(context){
        return new Promise((resolve)=>{
            const auth = JSON.parse(localStorage.getItem('auth'));
            if(auth !== null){
                context.commit('setAuthentication', true);
                context.commit('setAuthUsersData', auth.user);
                context.commit('setToken', `Bearer ${auth.access_token}`);
                resolve(true);
            }else{
                context.commit('setAuthentication', false );
                context.commit('setAuthUsersData', {});
                context.commit('setToken', null);
                resolve(false);
            }
        });
    },
    forgotPassword(context, payload){
        return new Promise((resolve, reject) => {
            axios.post('/forgot-password', payload)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
    resetPassword(context, payload){
        return new Promise((resolve, reject) => {
            axios.post('/reset-password', payload)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
        });
    },
}

export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
});