<template>
<div class="container">
<div class="section">
    <div v-if="!loading">
        <div v-if="Object.keys(book).length > 0">
            <book-single :book="book">
                    <template v-if="isAuthor()" v-slot:manage-buttons>
                    <a @click="deleteBook" class="btn-floating btn-small waves-effect waves-light right black"><i class="material-icons">delete</i></a>
                    <router-link :to="{ name: 'edit_book', params: { id: book.id }}" class="btn-floating btn-small waves-effect waves-light right bggold mr-1">
                        <i class="material-icons">edit</i>
                    </router-link> 
                    </template>
            </book-single>
            <!--Reviews-->
            <reviews :book="book"></reviews>
        </div>
        <div class="section" v-else>
            <h2>Book Not Found</h2>
            <router-link to="/books" class="waves-effect waves-light btn">Search Books</router-link>
        </div>
    </div>
    <div class="progress" v-else>
        <div class="indeterminate"></div>
    </div>
</div>
</div>
</template>
<script>
//Use custom axios instance
import axios from '../axios'
import Reviews from '@/components/Reviews.vue'
import BookSingle from '@/components/Display/BookSingle.vue'

import {mapActions} from 'vuex'

export default {
    name: 'Book',
    components:{
        Reviews, 
        BookSingle,
    },
    data(){
        return {
            book : {},
            loading: true,
        }
    },
    created(){
        this.loadBook();
    },
    methods:{
        ...mapActions({
            delete: 'books/deleteAction',
        }),
        loadBook(){
             axios.get(`/books/${this.$route.params.id}`)
             .then(response => {
                 this.book = response.data.data;
                 this.loading = false;
             })
             .catch(() => {
                 this.loading = false;
                 this.$noty.error("There was an error. Book can not be loaded");
             })
        },
        deleteBook(){
            SwalDelete.fire('Delete This Book?', 'Note, all the reviews for this book will be deleted too!')
                .then((result) => {
                if (result.value) {
                    this.loading = true;
                    this.delete(this.book)
                    .then(response =>{
                        this.loading = false;
                        //Redirect to all books
                        this.$router.push('/books');
                        this.$noty.success("Book Deleted!");
                    })
                    .catch(({response}) => {
                        this.loading = false;
                        if(response.status == 401){
                            this.$noty.warning("Please login to perform this action");
                        }else if(response.status == 403){
                            this.$noty.error("You are not authorized to perform this action");
                        }else{
                            this.$noty.error("There was an error. Please try again later.");
                        }
                    });
                }
            })
        },
         isAuthor(){
            return this.$store.getters['auth/isOwner'](this.book.uploaded_by_user);
        },
    },
}
</script>
