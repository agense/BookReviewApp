<template>
    <!-- Modal -->
    <div id="author-modal" class="modal">
        <div class="modal-content">
            <div class="section">
                <h2 v-if="!editMode">Add An Author</h2>
                <h2 v-else>Update Author</h2>
                <div class="row">
                    <form @submit.prevent="formHandler">
                    <div class="col s12 l8 offset-l2">
                        <div class="input-field">
                            <input id="author_name" type="text" v-model="form.name">
                            <label for="author_name" :class="{'active':editMode}">Name</label>
                            <div class="errors" v-if="errors.name">
                                <small class="red-text text-lighten-1" :key="error" v-for="error in errors.name">{{error}}</small>
                            </div>
                        </div>
                        <br/>
                        <div class="right-align">
                            <button class="btn waves-effect waves-light" type="submit" name="submit" v-if="!this.loading">Save
                                <i class="material-icons right">send</i>
                            </button>
                            <div class="progress" v-else>
                                <div class="indeterminate"></div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'ManageAuthors',
    props:{
        author: {
            type: Object,
            required: false,
            default: {}
        },
        editMode:{
            type: Boolean,
            required: true,
        }
    },
    data(){
        return{
            errors: {},
            form: {},
            loading: false,
        }
    },
    created(){
        window.eventTransmitter.$on('deleteAuthor', this.deleteAuthor)
    },
    methods: {
        ...mapActions({
            add: 'authors/addAction',
            delete: 'authors/deleteAction',
            update: 'authors/updateAction'
        }),
        formHandler(){
            if(this.editMode){
                this.updateAuthor();
            }else{
                this.createAuthor();
            }
        },
        createAuthor(){
            this.errors = {};
            this.loading = true;
            this.add(this.form)
            .then(response =>{
                this.loading = false;
                this.clearModal();
                this.$noty.success("Author Added!");
            })
            .catch(({response}) => {
                 this.loading = false;
                 this.handleErrors(response);
             });
        },
         updateAuthor(){
            this.errors = {};
            this.loading = true;
            this.update(this.form)
            .then(response =>{
                this.loading = false;
                this.clearModal();
                this.$noty.success("Author Updated!");
            })
            .catch(({response}) => {
                 this.loading = false;
                 this.handleErrors(response);
             });
        },
        deleteAuthor(){
             SwalDelete.fire('Delete This Author?').then((result) => {
                if (result.value) {
                    this.loading = true;
                    this.delete(this.author)
                    .then(response =>{
                        this.loading = false;
                        this.$noty.success("Author Deleted!");
                    })
                    .catch(({response}) => {
                        this.loading = false;
                        this.handleErrors(response);
                    });
                }
            })
        },
        clearModal(){
            this.errors = {};
            this.form = {};
            let modal = M.Modal.getInstance($('#author-modal'));
            modal.close();
        },
        handleErrors(response){
            if(response.status == 422){
                this.errors = response.data.errors;
            }else if(response.status == 401){
                this.$noty.warning("Please login to perform this action");
                this.clearModal();
            }else if(response.status == 403){
                this.$noty.error("You are not authorized to perform this action");
                this.clearModal();
            }else{
                this.$noty.error("There was an error. Please try again later.");
            }
        }
    },
    watch:{
        author(){
            this.form = {...this.author}
            this.errors = {}
        }
    }
}
</script>