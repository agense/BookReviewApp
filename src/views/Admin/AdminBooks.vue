<template>
    <div>
        <!--Admin Menu-->
        <admin-menu></admin-menu>
        <!--End Admin Menu-->

        <div class="admin-area">
        <div class="section container">
            <!--Page Header-->
            <actionable-header :linkto="'/books/add'" backlink="/admin/books">
                <template v-slot:title>Books</template>
                <template v-slot:totals>Total: {{itemCount}}</template>
            </actionable-header>
            <!--Page Header-->
            <div class="divider"></div>
            <book-filters :books="books" v-on:filtered="filterBooks"></book-filters>
            <!--Paginated Content-->
            <paginator :items="filteredBooks" v-if="filteredCount">
            <template slot-scope="{collection}">   
                    <content-table>
                        <template v-slot:headers>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Pub. Year</th>
                            <th class="center-align">Rating</th>
                            <th></th>
                        </template>
                        <template v-slot:content>
                             <tr v-for="book in collection" :key="book.id">
                                <td>{{book.title}}</td>
                                <td>{{book.author}}</td>
                                <td>{{book.genre}}</td>
                                <td>{{book.publication_year}}</td>
                                <td class="rating-col center-align">
                                    <star-rating :rating="book.rating"></star-rating>
                                    <span class="small-text grey-text center-align">Reviews: {{book.review_count}}</span>
                                </td>
                                <td class="btn-group-triple">
                                    <a @click="deleteBook(book)" class="btn-floating btn-small waves-effect waves-light right black"><i class="material-icons">delete</i></a>
                                    <router-link :to="{ name: 'edit_book', params: { id: book.id }}" class="btn-floating btn-small waves-effect waves-light right bggold mr-1">
                                    <i class="material-icons">edit</i>
                                    </router-link> 
                                </td>
                            </tr>
                        </template>
                    </content-table>
                </template>
            </paginator>
            <!--End Paginated Content-->
            <div v-else class="no-results">
                No Books Matching Your Search Were Found
            </div>
    </div>
    </div>
    <!-- End Modal component with actions-->
    </div>
</template>
<script>
import AdminMenu from '@/components/AdminMenu.vue'
import StarRating from '@/components/Display/StarRating.vue'
import Paginator from '@/components/Paginator.vue'
import ContentTable from '@/components/Display/Table.vue'
import ActionableHeader from '@/components/Display/ActionableHeader.vue'
import BookFilters from '@/components/BookFilters.vue'

import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'AdminBooks',
    components:{
        AdminMenu,
        ContentTable,
        StarRating,
        Paginator,
        ActionableHeader,
        BookFilters 
    },
    data(){
        return {
            book: {},
            editMode: false,
            filteredBooks: [],
            author: '',
            genre: '',
        }
    },
    mounted(){
        $('#show-book-modal').modal();
        this.allBooks();
    },
    methods:{
        ...mapActions({
            delete: 'books/deleteAction',
        }),
        allBooks(){
            if(this.books !== []){
                this.filteredBooks = this.books;
            }
        },
        filterBooks(booklist){
            this.filteredBooks = booklist;
        },
        deleteBook(book){
            this.book = book;
            SwalDelete.fire('Delete This Book?', 'Note, all the reviews for this book will be deleted as well.')
            .then((result) => {
                if (result.value) {
                    this.loading = true;
                    this.delete(this.book)
                    .then(response =>{
                        this.loading = false;
                        this.$noty.success("Book Deleted!");
                    })
                    .catch(() => {
                        this.loading = false;
                        this.$noty.error("There was an error. Please try again later.");
                    });
                }
            })
        },
    },
    computed:{
        ...mapGetters({
            books : 'books/allBooks',
            itemCount: 'books/itemCount'
        }),
        filteredCount(){
            return this.filteredBooks.length;
        }
    },
    watch:{
        books(){
           this.allBooks();
        }
    }
    
}
</script>
<style scoped>
.divider{
    margin-bottom:1rem;
}
.section{
    padding-bottom: 0;
    margin-bottom: 0;
}
</style>