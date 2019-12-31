<template>
    <div>
        <!--Admin Menu-->
        <admin-menu></admin-menu>
        <!--End Admin Menu-->

        <div class="admin-area">
        <div class="section container">
            <!--Page Header-->
            <actionable-header v-on:addmodal="openAddModal">
                <template v-slot:title>Genres</template>
                <template v-slot:totals>Total: {{itemCount}}</template>
            </actionable-header>
            <!--Page Header-->

            <!--Paginated Content-->
            <paginator :items="genres">
            <template slot-scope="{collection}">   
                    <content-table>
                        <template v-slot:headers>
                            <th>Name</th>
                            <th class="center-align">Nr. Of Books</th>
                            <th></th>
                        </template>
                        <template v-slot:content>
                            <tr v-for="genre in collection" :key="genre.id">
                                <td>{{genre.name}}</td>
                                <td class="center-align">{{genre.book_count}}</td>
                                <td class="btn-group-double">
                                    <a @click="deleteItem(genre)" class="btn-floating btn-small waves-effect waves-light right black"><i class="material-icons">delete</i></a>
                                    <a @click="openEditModal(genre)" class="btn-floating btn-small waves-effect waves-light right bggold mr-1"><i class="material-icons">edit</i></a>       
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
     <manage-genres :genre="genre" :editMode="editMode"></manage-genres>
    <!-- End Modal component with actions-->
    </div>
</template>
<script>
import AdminMenu from '@/components/AdminMenu.vue'
import ManageGenres from '@/components/ManageGenres.vue'
import Paginator from '@/components/Paginator.vue'
import ContentTable from '@/components/Display/Table.vue'
import ActionableHeader from '@/components/Display/ActionableHeader.vue'

import {mapGetters} from 'vuex'

export default {
    name: 'AdminGenres',
    components:{
        AdminMenu,
        ContentTable,
        ManageGenres,
        Paginator,
        ActionableHeader
    },
    data(){
        return {
            genre: {},
            editMode: false,
        }
    },
    mounted(){
        $('#genre-modal').modal();
    },
    methods:{
        openAddModal(){
            this.genre = {},
            this.editMode = false;
            this.openModal();
        },
        openEditModal(genre){
            this.genre = genre;
            this.editMode = true;
            this.openModal();
        },
        deleteItem(genre){
            this.genre = genre;
            window.eventTransmitter.$emit('deleteGenre');
        },
        openModal(){
            let modal = M.Modal.getInstance($('#genre-modal'));
            modal.open(); 
        },
    },
    computed:{
        ...mapGetters({
            genres : 'genres/allGenres',
            itemCount: 'genres/itemCount'
        }),
    }
}
</script>
