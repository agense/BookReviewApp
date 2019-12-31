<template>
    <manage-books :book="book" :editMode="true"></manage-books>
</template>
<script>
import axios from '../axios'
import ManageBooks from '@/components/ManageBooks.vue'

export default {
    name: 'EditBook',
    components:{
        ManageBooks,
    },
    data(){
        return{
            book:{},
        }
    },
    created(){
        this.loadBook();
    },
    methods:{
        loadBook(){
             axios.get(`/books/${this.$route.params.id}`)
             .then(response => {
                 this.loading = false;
                 this.book = response.data.data;
             })
             .catch(() => {
                 this.loading = false;
                 this.$noty.error("There was an error. Book can not be loaded");
             })
        },

    }
}
</script>