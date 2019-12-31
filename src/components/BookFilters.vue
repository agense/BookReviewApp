<template>
    <div class="row section">
        <div class="col s12 m12 l6">
                <div class="input-field">
                <input id="search" type="text" v-model="search" @keyup.enter="searchFilter()">
                <label for="search" :class="{'active': search}">Find By Name</label>
                </div>
        </div>
        <div class="col s12 m12 l6">
                <div class="input-field col s12 m6">
                    <form-select :items="genres" item="genre" valuefield="name" showfield="name" :allfield="true"
                    :preselected="genre" label="Filter By Genre" v-on:selected="genreFilter">
                    </form-select>
                </div>
                <div class="input-field col s12 m6">
                    <form-select :items="authors" item="author" valuefield="name" showfield="name" :allfield="true"
                    :preselected="author" label="Filter By Author" v-on:selected="authorFilter">
                    </form-select>
                </div>
        </div>
    </div>
</template>

<script>
import FormSelect from '@/components/Display/FormSelect.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'BookFilters',
    props: {
        books:{
            type: Array,
            required: true,
        }
    },
    components:{
        FormSelect 
    },
    data(){
        return {
            search: '',
            genre: 'all',
            author: 'all',
        }
    },
    methods:{
        genreFilter(selected){
             this.search = "";
             this.genre = selected;
             let filtered = this.filter();
             this.$emit('filtered', filtered);
        },
        authorFilter(selected){
             this.search = "";
             this.author = selected;
             let filtered = this.filter();
             this.$emit('filtered', filtered);
        },
        searchFilter(){
            this.clearFilters();
        },
        clearFilters(){
            this.genre = "all";
            this.author = "all";
            let filtered = this.searchByName();
            this.$emit('filtered', filtered);
        },
        searchByName(){
            if(this.search !== ""){
                return this.books.filter(book => {
                    return book.title.toLowerCase().includes(this.search.toLowerCase());
                });
            }
            return this.books;
        },
        filter(){
            if(this.genre !== "all" && this.author !== "all"){
                return this.books.filter(book => {
                    return (book.author == this.author && book.genre == this.genre);
                });
            }else if(this.genre !== "all"){
                return this.books.filter(book => {
                    return book.genre == this.genre;
                });
            }else if(this.author !== "all"){
                return this.books.filter(book => {
                    return book.author == this.author;
                });
            }else{
                return this.books;
            }
        }
    },
    computed:{
         ...mapGetters({
            authors : 'authors/allAuthors',
            genres: 'genres/allGenres'
        }),
        
    },
    watch: {
        search(){
         if(this.search =="" && this.genre=="all" && this.author == "all"){
             this.$emit('filtered', this.books);
         }
        },
    }

}
</script>