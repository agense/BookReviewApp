<template>
    <div class="container books-container mb-3">
        <book-filters :books="books" v-on:filtered="filterBooks"></book-filters>
        
        <div class="row" v-if="loaded">
            <div class="book-container" v-if="filteredBooks.length > 0">
            <paginator :items="filteredBooks" resultsPerPage="12" :displayIndexes="false">
                <template slot-scope="{collection}">  
                    <div class="col s12 m6 l3" v-for="book in collection" :key="book.id">
                        <!--Single Book -->
                        <book-in-list :book="book"></book-in-list>
                    </div>
                </template>
            </paginator>
            </div>
            <div class="no-results" v-else>No Books Matching Your Search Were Found</div>
        </div>

        <div class="progress"  v-else>
            <div class="indeterminate"></div>
        </div>
    </div>
</template>
<script>
import BookInList from '@/components/Display/BookInList.vue'
import BookFilters from '@/components/BookFilters.vue'
import Paginator from '@/components/Paginator.vue'

import {mapGetters} from 'vuex'

export default {
    name: 'Books',
    components:{
        BookInList,
        BookFilters,
        Paginator
    },
    data(){
        return {
            filteredBooks: [],
            author: '',
            genre: '',
        }
    },
    mounted(){
        this.allBooks();
    },
    methods: {
        filterBooks(booklist){
            this.filteredBooks = booklist;
        },
        allBooks(){
            if(this.books !== []){
                this.filteredBooks = this.books;
            }
        }
    },
    computed:{
        ...mapGetters({
            books : 'books/allBooks',
            loaded: 'books/loadedState',
        }),
    },
    watch:{
        books(){
           this.allBooks();
        }
    }
}
</script>
<style scoped>
@media screen and (max-width: 600px){
.books-container {
    width:65%;
}
}
@media screen and (max-width: 468px){
.books-container {
    width:80%;
}
}
@media screen and (max-width: 360px){
.books-container {
    width:90%;
}
}
</style>