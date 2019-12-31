<template>
    <div class="container">
        <div class="section mb-3">
            <div class="row hide-on-large-only">
                <h2 v-if="editMode" class="header">Edit Book</h2>
                <h2 v-else class="header">Add A Book</h2>
            </div>
            <div class="row">
                    <div class="col s12 m-10 l10 offset-l1">
                    <form @submit.prevent="formHandler">
                        <div class="card horizontal">
                            <div class="card-image hide-on-med-and-down">
                                <img src="../assets/img/bookbag.jpg">
                                <span v-if="editMode" class="card-title black-text">Edit Book</span>
                                <span v-else class="card-title black-text">Add A Book</span>
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                <div class="card-image-container" v-if="editMode && book.image && !imageUploader">
                                    <div class="card-image-holder">
                                        <img :src="book.image" class="responsive-img" id="book-image">
                                    </div>
                                    <button type="button" @click="showImageUploader" class="btn waves-effect waves-light teal">Change Image</button>  
                                </div>
                                <div class="card-image-container" v-else>
                                    <div class="card-image-holder">
                                    <picture-input 
                                        @change="setImage" 
                                        width = "240"
                                        height="300" 
                                        margin="0" 
                                        zIndex="8"
                                        accept="image/jpeg,image/png" 
                                        size="10" 
                                        buttonClass="btn"
                                        :customStrings="{
                                            upload: '<h1>Error</h1>',
                                            drag: 'Upload Book Image'
                                        }">
                                    </picture-input>
                                    </div>
                                    <div class="errors image-errors" v-if="errors.image">
                                     <small class="red-text text-lighten-1" :key="error" v-for="error in errors.image">{{error}}</small>
                                    </div>
                                </div>
                                    <div v-if="!editMode" class="left-align mtn-3 mb-3">
                                    <a @click="openAddModal" class="btn waves-effect waves-light positioned black">New Author</a>
                                    </div>
                                    <div v-else class="mb-4 d-block"></div>
                                    <div class="input-field fm-input">
                                        <form-select :items="authors" item="author" label="Author" :preselected="book.author_id" 
                                        v-on:selected="resetAuthor">
                                        </form-select>
                                         <div class="errors" v-if="errors.author_id">
                                            <small class="red-text text-lighten-1" :key="error" v-for="error in errors.author_id">{{error}}</small>
                                        </div>
                                        
                                    </div>
                                    <div class="input-field fm-input mt-2">
                                        <form-select :items="genres" item="genre" label="Genre" :preselected="book.genre_id" 
                                        v-on:selected="resetGenre">
                                        </form-select>
                                        <div class="errors" v-if="errors.genre_id">
                                            <small class="red-text text-lighten-1" :key="error" v-for="error in errors.genre_id">{{error}}</small>
                                        </div>
                                    </div>
                                    <div class="input-field">
                                        <input id="title" type="text" v-model="form.title">
                                        <label for="title" :class="{'active':editMode}">Title</label>
                                        <div class="errors" v-if="errors.title">
                                            <small class="red-text text-lighten-1" :key="error" v-for="error in errors.title">{{error}}</small>
                                        </div>
                                    </div>
                                    <div class="input-field">
                                        <input type="number" min="1900" :max="currentYear" step="1"  v-model="form.publication_year" id="publication_year">
                                        <label for="publication_year" :class="{'active': editMode}">Publication Year</label>
                                        <div class="errors" v-if="errors.publication_year">
                                            <small class="red-text text-lighten-1" :key="error" v-for="error in errors.publication_year">{{error}}</small>
                                        </div>
                                    </div>
                                    <div class="input-field">
                                        <textarea id="description" class="materialize-textarea" v-model="form.description"></textarea>
                                        <label :class="{'active':editMode}" for="description">Description</label>
                                        <div class="errors" v-if="errors.description">
                                            <small class="red-text text-lighten-1" :key="error" v-for="error in errors.description">{{error}}</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action">
                                    <div class="right-align" v-if="!loading">
                                        <button class="btn waves-effect waves-light" type="submit" name="submit">Save
                                            <i class="material-icons right">send</i>
                                        </button>
                                    </div>
                                    <div class="progress"  v-else>
                                        <div class="indeterminate"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <manage-authors :author="author" :editMode="false"></manage-authors>
    </div>
</template>
<script>
import PictureInput from 'vue-picture-input'
import ManageAuthors from '@/components/ManageAuthors.vue'
import FormSelect from '@/components/Display/FormSelect.vue'

import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'ManageBooks',
    components:{
        PictureInput,
        ManageAuthors,
        FormSelect 
    },
    props: {
        book : {
            type: Object,
            required: false,
            default : {},
        },
        editMode : {
            type : Boolean,
            required: false,
            default: true,
        },
    },
    data(){
        return {
            author: {},
            currentYear: new Date().getFullYear(),
            form: {},
            errors: {},
            loading: false,
            imageUploader: false, 
        }
    },
    mounted(){
        $('#author-modal').modal();
        this.activateFields();
    },
    methods:{
        ...mapActions({
            add: 'books/addAction',
            update: 'books/updateAction'
        }),
        formHandler(){
            if(this.editMode){
                this.updateBook();
            }else{
                this.createBook();
            }
        },
        openAddModal(){
            $('#author-modal').modal();
            let modal = M.Modal.getInstance($('#author-modal'));
            modal.open();
        },
        showImageUploader(){
            this.imageUploader = !this.imageUploader;
        },
        setImage(image){
          this.form.image = image;
        },
        createBook(){
            this.errors = {};
            this.loading = true;
            this.add(this.form)
            .then(response =>{
                this.loading = false;
                this.$router.push({ name: 'book', params: { id: response.data.data.id } });
                this.$noty.success("Book Added!");
            })
            .catch(({response}) => {
                 this.loading = false;
                 this.handleErrors(response);
             });
        },
        updateBook(){
            this.errors = {};
            this.loading = true;
            this.update(this.form)
            .then(response =>{
                this.loading = false;
                this.$router.push({ name: 'book', params: { id: this.book.id } });
                this.$noty.success("Book Updated!");
            })
            .catch(({response}) => {
                 this.loading = false;
                 this.handleErrors(response);
             });
        },
        handleErrors(response){
            if(response.status == 422){
                this.errors = response.data.errors;
            }else if(response.status == 401){
                this.$noty.warning("Please login to perform this action");
            }else if(response.status == 403){
                this.$noty.error("You are not authorized to perform this action");
            }else{
                this.$noty.error("There was an error. Please try again later.");
            }
        },
        activateFields(){
            let elems = document.getElementsByTagName('label');
            setTimeout(()=>{
                if(this.editMode){
                    Array.from(elems).forEach(element => {
                        element.classList.add('active');
                    });
                }
            }, 500);
        },
        resetGenre($event){
            this.form.genre_id = $event;
            this.form.genre = this.genres.find(genre => genre.id === $event).name;
        },
        resetAuthor($event){
            this.form.author_id = $event;
            this.form.author = this.authors.find(author => author.id === $event).name;
        }
    },
    computed: {
        ...mapGetters({
            authors : 'authors/allAuthors',
            genres: 'genres/allGenres'
        }),
    },
    watch:{
        book(){
            this.form = {...this.book}
            this.form.image = null;
            this.errors = {}
        }
    }
}
</script>
<style scoped>
.errors{
    text-align: left;
}
.card.horizontal .card-image {
    max-width: 40%;
    min-height: 770px;
}
.card.horizontal .card-image img {
    border-radius: 2px 0 0 2px;
    max-width: 100%;
    width: auto;
    height: 100%;
    object-fit: cover;
}
.card .card-content {
    padding: 25px 45px;
}
.card.horizontal .card-image-container{
    width: 300px;
    max-width: 100%;
    height: 300px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 5rem;

}
.card-image-holder{
    width: calc(100% - 4rem);
    margin: 0 auto;
    max-height: 300px;
    min-height: 300px;
    margin-bottom: 1rem;
    overflow: hidden;
}
.card-image-holder img {
    max-width: 100%;
    min-height: 100%;
    object-fit: cover;
    min-height: 300px;
}
.card .card-image .card-title{
    bottom:auto;
    top:0;
    border-bottom:1px solid #989898;
}
.image-errors{
    margin-top: -10px;
    margin-left: -30px;
}
@media screen and (max-width: 768px) {
    .card-image-holder{
    width: 100%;
    }
}
</style>