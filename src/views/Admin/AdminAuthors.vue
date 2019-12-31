<template>
    <div>
        <!--Admin Menu-->
        <admin-menu></admin-menu>
        <!--End Admin Menu-->

        <div class="admin-area">
        <div class="section container">
            <!--Page Header-->
            <actionable-header v-on:addmodal="openAddModal">
                <template v-slot:title>Authors</template>
                <template v-slot:totals>Total: {{itemCount}}</template>
            </actionable-header>
            <!--Page Header-->

            <!--Paginated Content-->
            <paginator :items="authors">
            <template slot-scope="{collection}">   
                    <content-table>
                        <template v-slot:headers>
                            <th>Name</th>
                            <th class="center-align">Nr. Of Books</th>
                            <th></th>
                        </template>
                        <template v-slot:content>
                            <tr v-for="author in collection" :key="author.id">
                                <td>{{author.name}}</td>
                                <td class="center-align">{{author.book_count}}</td>
                                <td class="btn-group-double">
                                    <a @click="deleteItem(author)" class="btn-floating btn-small waves-effect waves-light right black"><i class="material-icons">delete</i></a>
                                    <a @click="openEditModal(author)" class="btn-floating btn-small waves-effect waves-light right bggold mr-1"><i class="material-icons">edit</i></a>       
                                </td>
                            </tr>
                        </template>
                    </content-table>
                </template>
            </paginator>
            <!--End Paginated Content-->
    </div>
    </div>
    <!-- Modal component with actions-->
    <manage-authors  :author="author" :editMode="editMode"></manage-authors>
    <!-- End Modal component with actions-->
    </div>
</template>
<script>
import AdminMenu from '@/components/AdminMenu.vue'
import ManageAuthors from '@/components/ManageAuthors.vue'
import Paginator from '@/components/Paginator.vue'
import ContentTable from '@/components/Display/Table.vue'
import ActionableHeader from '@/components/Display/ActionableHeader.vue'

import {mapGetters} from 'vuex'

export default {
    name: 'AdminAuthors',
    components:{
        AdminMenu,
        ContentTable,
        ManageAuthors,
        Paginator,
        ActionableHeader
    },
    data(){
        return {
            author: {},
            editMode : false,
        }
    },
    mounted(){
        $('#author-modal').modal();
    },
    methods:{
         openAddModal(){
            this.author = {};
            this.editMode = false;
            this.openModal();
        },
         openEditModal(author){
            this.author = author;
            this.editMode = true;
            this.openModal();
        },
        deleteItem(author){
            this.author = author;
            window.eventTransmitter.$emit('deleteAuthor');
        },
        openModal(){
            let modal = M.Modal.getInstance($('#author-modal'));
            modal.open(); 
        }
    },
    computed:{
        ...mapGetters({
            authors : 'authors/allAuthors',
            itemCount: 'authors/itemCount'
        }),

    }
}
</script>

