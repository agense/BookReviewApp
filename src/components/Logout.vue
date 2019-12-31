<template>
    <a href="" @click.prevent="logoutUser()">Logout</a>
</template>
<script>
import {mapActions} from 'vuex' 
export default {
    name: 'Logout',
    methods:{
        ...mapActions({
        'logout' : 'auth/logout'
        }),
        logoutUser(){
        this.logout()
        .then(() => {
            this.$router.push('/login');
            this.$noty.success("Logout Successful!");
        })
        .catch(() => {
            this.$noty.error("Sorry, Logout Failed");
        });
        }
    }
}
</script>