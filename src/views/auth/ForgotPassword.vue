<template>
<div class="container mb-3">
    <div class="row section">    
        <div class="col s12 m12 m12 l10 offset-l1">
            <div class="card horizontal">
                <div class="card-image hide-on-small-only">
                    <img src="../../assets/img/library.jpg">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                            <h2 class="left-align">Password Rest Request</h2>
                            <div class="input-field mt-2 mb-2">
                                <input type="text" v-model="email" id="email">
                                <label for="email">Email</label>
                                <div class="errors  left-align" v-if="errors.email">
                                    <small class="red-text text-lighten-1" :key="index" v-for="(error, index) in errors.email">{{error}}</small>
                                </div>
                            </div>
                            <div class="right-align mt-3" v-if="!loading">
                            <button class="btn waves-effect waves-light" :disabled="loading" @click="sendPasswordResetEmail()">
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
    name: 'ForgotPassword',
    data(){
        return {
            email: '',
            errors : {},
            loading : false
        }
    },
    methods: {
        ...mapActions({
            'forgotPassword' : 'auth/forgotPassword'
        }),
        sendPasswordResetEmail(){
            this.loading = true;
            this.forgotPassword({email: this.email})
            .then(() => {
                this.loading = false;
                this.$noty.success("Password reset instructions were sent to your email.");
            }).catch((error) => {
                this.loading = false;
                if(error.response.status == 422){
                    this.errors = error.response.data;
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