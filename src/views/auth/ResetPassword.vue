<template>
<div class="container mb-3">
    <div class="row section">    
        <div class="col s12 m12 l10 offset-l1">
            <div class="card horizontal">
                <div class="card-image hide-on-small-only">
                    <img src="../../assets/img/library.jpg">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                            <h2 class="left-align">Reset Password</h2>
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
                                <div class="input-field">
                                <input type="password" v-model="user.password_confirmation" id="password-confirmation">
                                <label for="password">Confirm Password</label>
                                <div class="errors  left-align" v-if="errors.password">
                                    <small class="red-text text-lighten-1" :key="index" v-for="(error, index) in errors.password">{{error}}</small>
                                </div>
                            </div>
                            <div class="right-align" v-if="!loading">
                            <button class="btn waves-effect waves-light"  :disabled="loading" @click="passwordReset()">
                                Send
                            </button>
                            </div>
                            <div class="progress"  v-else>
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
    name: 'ResetPassword',
    data(){
        return {
            user: {
                email: '',
                password: '',
                password_confirmation : ''
            },
            errors : {},
            loading : false
        }
    },
    methods: {
        ...mapActions({
            'resetPassword' : 'auth/resetPassword'
        }),
        passwordReset(){
            this.loading = true;
            const token = this.$route.query.token;  
            this.resetPassword({...this.user, token: token})
            .then(() => {
                this.$noty.success("Password reset successful");
                this.$router.push({name: "login"});
            }).catch(({response}) => {
                this.loading = false;
                if(response.status == 422){
                    this.errors = response.data.errors;
                }else{
                    this.$noty.error("There was an error.Please try again later.");
                }
            });
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