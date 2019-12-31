<template>
    <div>
        <!--Admin Menu-->
        <admin-menu></admin-menu>
        <!--End Admin Menu-->

        <div class="admin-area">
        <div class="section container">
            <!--Page Header-->
            <actionable-header :noaction="true">
                <template v-slot:title>App Members</template>
                <template v-slot:totals>Total: {{itemCount}}</template>
            </actionable-header>
            <!--Page Header-->

            <!--Paginated Content-->
            <paginator :items="users" v-if="!loading">
            <template slot-scope="{collection}">   
                    <content-table>
                        <template v-slot:headers>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Joined On:</th>
                            <th class="center-align">Books Contributed</th>
                            <th class="center-align">Reviews Added</th>
                            <th></th>
                        </template>
                        <template v-slot:content>
                            <tr v-for="user in collection" :key="user.id">
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.registration_date}}</td>
                                <td class="center-align">{{user.book_count}}</td>
                                <td class="center-align">{{user.review_count}}</td>
                                <td class="btn-group-double">
                                    <a @click="deleteItem(user)" class="btn-floating btn-small waves-effect waves-light right black"><i class="material-icons">delete</i></a>
                                </td>
                            </tr>
                        </template>
                    </content-table>
                </template>
            </paginator>
            <!--End Paginated Content-->
            <div class="progress" v-else>
                <div class="indeterminate"></div>
            </div>
    </div>
    </div>
    </div>
</template>
<script>
import axios from '../../axios'
import AdminMenu from '@/components/AdminMenu.vue'
import Paginator from '@/components/Paginator.vue'
import ContentTable from '@/components/Display/Table.vue'
import ActionableHeader from '@/components/Display/ActionableHeader.vue'

export default {
    name: 'AdminManageMembers',
    components:{
        AdminMenu,
        ContentTable,
        Paginator,
        ActionableHeader
    },
    data(){
        return {
            users: [],
            user: {},
            loading: true,
        }
    },
    created(){
        this.loadUsers();
    },
    methods:{
        loadUsers(){
             axios.get('/users')
             .then((response) => {
                 this.loading = false;
                 this.users = response.data.data;
             })
             .catch(() => {
                 this.loading = false;
                 this.$noty.error("There was an error. Users can not be loaded");
             })
        },
        deleteItem(user){
           this.user = user;
            SwalDelete.fire(
                'Delete This User\'s Account?', 
                'The account will be deleted permanently. All user\'s reviews will be deleted too!!! ')
                .then((result) => {
                if (result.value) {
                    this.loading = true;
                    axios.delete(`/users/${this.user.id}`)
                    .then(response =>{
                        this.loading = false;
                        this.removeUserFromList();
                        this.$noty.success("User Account Deleted!");
                    })
                    .catch(({response}) => {
                        this.loading = false;
                        this.handleErrors(response);
                    });
                }
            })
        },
        removeUserFromList(){
            this.users = this.users.filter(user =>{
                return user.id != this.user.id;
            });
        },
        handleErrors(response){
            if(response.status == 401){
                this.$noty.warning("Please login to perform this action");
            }else if(response.status == 403){
                this.$noty.error("You are not authorized to perform this action");
            }else{
                this.$noty.error("There was an error. Please try again later.");
            }
        }
    },
    computed:{
        itemCount(){
            return this.users.length;
        }
    }
}
</script>
