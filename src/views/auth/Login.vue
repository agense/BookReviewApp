<template>
<div class="container mb-3">
    <div class="row section">    
        <div class="col s12 m12 l10 offset-l1">
            <div class="card horizontal">
                <div class="card-image hide-on-small-only">
                    <img src="../../assets/img/library.jpg">
                </div>
                <div class="card-stacked auth-card">
                    <div class="card-content">
                            <h2 class="left-align">Login</h2>
                            <div class="input-field">
                                <input type="text" v-model="user.email" id="email">
                                <label for="email">Email</label>
                                <div class="errors  left-align" v-if="errors.email">
                                    <small class="red-text text-lighten-1" :key="index" v-for="(error, index) in errors.email">{{error}}</small>
                                </div>
                            </div>
                            <div class="input-field">
                                <input type="password" v-model="user.password" id="password">
                                <label for="password">Password</label>
                                <div class="errors  left-align" v-if="errors.password">
                                    <small class="red-text text-lighten-1" :key="index" v-for="(error, index) in errors.password">{{error}}</small>
                                </div>
                            </div>
                            <div class="dflex content-between" v-if="!loading">
                                <router-link to="/forgot-password" class="teal-text mini-subtitle">Forgot My Password</router-link>
                                <button class="btn waves-effect waves-light"  :disabled="loading" @click="loginUser()">
                                    Login
                                </button>
                            </div>
                            <div class="progress" v-else>
                                    <div class="indeterminate"></div>
                            </div>
                    </div>
                </div>
            </div>
        </div>       
    </div>
</div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
    name: 'Login',
    data(){
        return {
            user: {
                email : '',
                password: '',
            },
            errors : {},
            loading : false
        }
    },
    methods: {
        ...mapActions({
            'login' : 'auth/login'
        }),
        loginUser(){
            this.loading = true;
            this.login(this.user)
            .then(response => {
                this.loading = false;
                this.$noty.success("You are logged in");
                this.$router.push('/');
            })
            .catch(({response}) => {
                this.loading = false;
                if(response.status == 422){
                    this.errors = response.data.errors;
                }else{
                    this.$noty.error("Login Error.Please try again later.");
                }
            })
        }
    }
}
</script>
<style scoped>
h2{
    margin-top:10px;
}
.card-content{
    padding:8% 10%;
}
.card.horizontal .card-image{
    max-width:270px;
    width:270px;
    min-height: 100%;
}
.card.horizontal .card-image img{
    width:100%;
    height:100%;
    object-fit: cover;
}
@media screen and (max-width: 768px){
.card.horizontal .card-image {
    max-width: 200px;
    width: 200px;
}
}
</style>