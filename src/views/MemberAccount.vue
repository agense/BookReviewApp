<template>
    <div class="section container">
        <div class="row">
            <div class="col s12 m12 l10 offset-l1">
                <div class="flex-container mb-2">
                    <div>
                    <h2>My Account</h2>
                    <div class="grey-text left-align">{{user.name}}</div>
                    <div class="grey-text left-align">Registered On: {{user.registration_date}}</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content"> 
                    <!--Tabs-->    
                    <div class="row">
                        <div class="col s12">
                        <ul class="tabs" id="account-tabs">
                            <li class="tab col s4"><a class="active" href="#tab1">My Contributions</a></li>
                            <li class="tab col s4"><a href="#tab2">Accout Details</a></li>
                            <li class="tab col s4"><a href="#tab3">Update Password</a></li>
                        </ul>
                        </div>
                        <div class="tab-content">
                        <div id="tab1" class="col s12 mt-2">
                                <div class="d-block mb-2 left-align">
                                    <span class="small-block-line">Book Count: {{user.book_count || 0}}</span>
                                    <span class="small-block-line">Review Count: {{user.review_count || 0}}</span>
                                    <span class="small-block-line">Author Count: {{user.author_count || 0}}</span>
                                </div>
                        </div>
                        <div id="tab2" class="col s12 mt-2">
                                <form @submit.prevent="updateProfile">
                                    <div class="input-field">
                                        <input id="name" type="text" v-model="user.name">
                                        <label for="name" class="active">Name</label>
                                        <div class="errors left-align" v-if="errors.name">
                                            <small class="red-text text-lighten-1" :key="error" v-for="error in errors.name">{{error}}</small>
                                        </div>
                                    </div>
                                    <div class="input-field">
                                        <input id="email" type="text" v-model="user.email">
                                        <label for="email" class="active">Email</label>
                                        <div class="errors left-align" v-if="errors.email">
                                            <small class="red-text text-lighten-1" :key="error" v-for="error in errors.email">{{error}}</small>
                                        </div>
                                    </div>
                                    <div class="right-align" v-if="!updating">
                                        <button class="btn waves-effect waves-light" type="submit" name="submit">Save Changes
                                            <i class="material-icons right">send</i>
                                        </button>
                                    </div>
                                    <div class="progress" v-else>
                                        <div class="indeterminate"></div>
                                    </div>
                                </form>
                        </div>
                        <div id="tab3" class="col s12 mt-2">
                            <form @submit.prevent="updatePassword">
                                    <div class="input-field">
                                        <input id="current_password" type="password" v-model="pwd_update.current_password">
                                        <label for="current_password" class="active">Current Password</label>
                                        <div class="errors left-align" v-if="errors.name">
                                            <small class="red-text text-lighten-1" :key="error" v-for="error in errors.name">{{error}}</small>
                                        </div>
                                    </div>
                                    <div class="input-field">
                                        <input id="new_password" type="password" v-model="pwd_update.password">
                                        <label for="new_password" class="active">New Password</label>
                                        <div class="errors left-align" v-if="errors.password">
                                            <small class="red-text text-lighten-1" :key="error.passowrd" v-for="error in errors.password">{{error}}</small>
                                        </div>
                                    </div>
                                    <div class="input-field">
                                        <input id="password_confirmation" type="password" v-model="pwd_update.password_confirmation">
                                        <label for="password_confirmation" class="active">Confirm New Password</label>
                                    </div>
                                    <div class="right-align" v-if="!updating">
                                        <button class="btn waves-effect waves-light" type="submit" name="submit">Save
                                            <i class="material-icons right">send</i>
                                        </button>
                                    </div>
                                    <div class="progress" v-else>
                                        <div class="indeterminate"></div>
                                    </div>
                                </form>
                        </div>
                        </div>
                    </div>
                    <!--End Tabs-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios'
export default {
    name: 'MemberAccount',
    data(){
        return{
            user: {},
            errors: {},
            loading: true,
            updating : false,
            pwd_update:{
                password: '',
                password_confirmation: '',
                current_password: ''
            }
        }
    },
    created(){
        this.loadUsersProfile();
    },
    mounted(){
        $('#account-tabs').tabs();
        $('.indicator').css('backgroundColor', '#26a69a');
    },
    methods:{
        loadUsersProfile(){
             axios.get('/users/profile')
            .then(response => {
                this.loading = false;
                this.user = response.data.data;
            })
            .catch(() => {
                this.loading = false;
                this.$noty.error("There was an error. Profile data can not be loaded");
            })
        },
        updateProfile(){
             this.updating = true;
             axios.put('users/profile', this.user)
            .then(response => {
                this.updating = false;
                this.user = response.data.data;
                this.$noty.success("Profile Updated!");
            })
            .catch(({response}) => {
                this.updating = false;
                this.handleErrors(response);
            })
        },
        updatePassword(){
            this.updating = true;
            axios.put('/users/resetPassword', this.pwd_update)
            .then(response => {
                this.updating = false;
                this.pwd_update= {};
                this.$noty.success("Password Updated!");
            })
            .catch(({response}) => {
                this.updating = false;
                this.handleErrors(response);
            })
        },
        handleErrors(response){
            if(response.status == 422){
                this.errors = response.data.errors;
            }else if(response.status == 401){
                this.$noty.warning("Please login to perform this action");
            }else if(response.status == 403){
                this.$noty.error("You are not authorized to perform this action");
            }else{
                this.$noty.error("There was an error. Please try again later.");
            }
        },
    } 
}
</script>
<style scoped>
.tab-content{
    padding: 1.5rem;
}
.tabs .tab a {
    color: grey;
}
.tabs .tab a:hover, .tabs .tab a.active {
    color: #111;
}
.tabs .tab a:focus, .tabs .tab a:focus.active {
    background-color: transparent;
    outline: none;
}
h2{
    margin-bottom: 0.5rem;
}
</style>