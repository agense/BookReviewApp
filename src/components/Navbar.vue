<template>
  <header>
    <div>
      <nav class="teal lighten-2 top-nav" role="navigation">
          <div class="nav-wrapper container">
            <div class="left">
            <router-link to="/" id="logo-container" href="#" class="brand-logo left-align hide-on-small-only">
              <img src="../assets/img/book_main.png" width="auto" height="25px" alt="">
              <span class="appname">{{appName}}</span>
            </router-link>
            </div>

            <!--RIGHT SITE MENU WIDE SCREEN AND MOBILE-->
            <ul class="right" id="topnav">
              <!--Not Authenticated Only-->
                <li v-if="!authenticated">
                  <router-link to="/login">Login</router-link>
                </li>
                <li v-if="!authenticated">
                  <router-link to="/signup">New Account</router-link>
                </li>
                <!--Authenticated Only-->
                <li v-show="authenticated">
                  <a class="dropdown-trigger" id="topnav-dropdown" href="#!" data-target="logout-dropdown">{{authUser.name}}<i class="material-icons right">arrow_drop_down</i></a>
                </li>
            </ul>

            <!--RIGHT MENU WIDE SCREEN ONLY-->
            <ul class="right hide-on-med-and-down">
                <!--Any user-->
                <li>
                  <router-link to="/">Home</router-link>
                </li>
                <li>
                  <router-link to="/books">Books</router-link>
                </li>
                <!--Authenticated Only-->
                <li v-if="authenticated">
                  <router-link to="/books/add">Add A Book</router-link>
                </li>
            </ul>

            <!--MOBILE NAVBAR-->
            <ul id="nav-mobile" class="sidenav">
              <li>
                  <div class="menu-head">
                    <img src="../assets/img/book_gold.png" alt="Logo">
                    <div class="site-name">{{appName}}</div>
                  </div>
              </li>
              <li>
                  <router-link to="/">Home</router-link>
              </li>
              <li>
                  <router-link to="/books">Books</router-link>
              </li>
              <!--Authenticated Only-->
              <li v-if="authenticated">
                  <router-link to="/books/add">Add A Book</router-link>
              </li>
              <!--Admin Panel Nav-->
              <div v-if="isAdmin">
              <li><div class="divider"></div></li>     
              <!--Admin Menu-->
              <admin-menu :sidemenu="false"></admin-menu>
              <!--End Admin Menu-->

              </div>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>      
          </div>
      </nav>

      <!--LOGGED IN USERS DROPDOWN MENU WIDE SCREENS-->
      <ul id="logout-dropdown" class="dropdown-content">
        <li v-if="authenticated"><logout></logout></li>
        <li v-if="authenticated"><router-link to="/members/account">My Account</router-link></li>
        <li v-if="isAdmin"><router-link to="/admin">Admin Panel</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
import AdminMenu from '@/components/AdminMenu.vue'
import Logout from '@/components/Logout.vue'
import {mapGetters} from 'vuex' 

export default {
  name: 'Navbar',
  components:{
    AdminMenu, 
    Logout
  },
  created(){
    $('.sidenav').sidenav();
    $("#nav-dropdown").dropdown();
    $("#topnav-dropdown").dropdown();
  },
  updated(){
    $("#nav-dropdown").dropdown();
    $("#topnav-dropdown").dropdown(); 
  },
  data(){
    return {
      appName: this.$root.appName,
    }
  },
  computed: {
    ...mapGetters({
      authUser : 'auth/authUser',
      authenticated : 'auth/authenticated',
      isAdmin : 'auth/isAdmin'
    }),
  },
}
</script>
<style>
nav{
    margin-bottom: 3rem;
}
.top-nav ul a{
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.95rem;
}
.site-name{
    color: #fff;
    text-transform: uppercase;
    font-family: 'Lato';
    margin-top: -20px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    letter-spacing: 0.1rem;
    font-weight: 600;
    text-shadow: 1px .5px .5px rgba(0,0,0,0.8);
}
.menu-head{
    background: #d1d1d1;
    height: 160px;
    background: url('../assets/img/library.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: bottom;
}
.menu-head img{
    width: 70px;
    margin-top: 20px;
    margin-bottom: 0;
}
.admin-links{
    margin-left: 50px;
}
#mobile-nav{
  height:100%;
}
#logout-dropdown{
  top:-60px;
  min-width: 150px;
}
.top-nav #logout-dropdown li > a, .top-nav #logout-dropdown li > span {
    font-size: 0.9rem;
}
@media screen and (max-width: 992px){
 nav .brand-logo {
    left: 10%;
    -webkit-transform: translateX(0);
    transform: translateX(0);
} 
}
</style>