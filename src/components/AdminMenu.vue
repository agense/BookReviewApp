<template>
    <div :class="{'padding-menu': !sidemenu}">
    <ul :class="{'sidenav admin-nav hide-on-med-and-down': sidemenu}">
        <li><a class="subheader">ADMIN MENU</a></li>
        <li><div class="divider"></div></li>
        <li><router-link to="/admin" class="waves-effect">Dashboard</router-link></li>
        <li><router-link to="/admin/genres" class="waves-effect">Genres</router-link></li>
        <li><router-link to="/admin/authors" class="waves-effect">Authors</router-link></li>
        <li><router-link to="/admin/books" class="waves-effect">Books</router-link></li>
        <li><router-link to="/admin/reviews" class="waves-effect">Reviews</router-link></li>
        <li><router-link to="/admin/members" class="waves-effect">Members</router-link></li>   
   </ul>
   </div> 

</template>
<script>
export default {
    name: 'AdminMenu',
    props:{
        sidemenu : {
            type: Boolean,
            required: false,
            default : true,
        },
    }
}
</script>
<style scoped>
.admin-nav{
    transform: translateX(0%)!important;
    padding-top: 80px;
    z-index: 555;
}
.padding-menu{
    padding-bottom:90px;
}
</style>