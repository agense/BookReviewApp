<template>
    <!-- Modal -->
    <div id="review-modal" class="modal rvmod" href="#">
        <div class="modal-content">
            <div class="section">
                <h2 v-if="!editMode">Add A Review</h2>
                <h2 v-else>Update Review</h2>
                <div class="row">
                    <form @submit.prevent="formHandler">
                    <div class="col l8 offset-l2">
                        <div class="input-field fm-input" v-if="book">
                           <form-select :items="[book]" item="book" showfield="title" label="Book" :preselected="review.book_id" 
                            v-on:selected="form.book_id = $event">
                            </form-select>
                        </div>
                        <div v-else class="input-field fm-input">
                            <form-select :items="books" item="book" showfield="title" label="Select A Book" :preselected="review.book_id" 
                                        v-on:selected="form.book_id = $event">
                            </form-select>
                        </div>
                        <div class="input-field">
                            <input id="rating" type="number" min="1" max="5" step="1" v-model="form.rating">
                            <label for="rating" :class="{'active':editMode}">Rating (stars)</label>
                            <div class="errors" v-if="errors.rating">
                                <small class="red-text text-lighten-1" :key="error" v-for="error in errors.rating">{{error}}</small>
                            </div>
                        </div>
                        <div class="input-field">
                            <textarea id="review" class="materialize-textarea" v-model="form.review"></textarea>
                            <label for="review" :class="{'active':editMode}">Review</label>
                            <div class="errors" v-if="errors.review">
                                <small class="red-text text-lighten-1" :key="error" v-for="error in errors.review">{{error}}</small>
                            </div>
                        </div>
                        <br/>
                        <div class="right-align">
                            <button class="btn waves-effect waves-light" type="submit" name="submit" v-if="!loading">Save
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
import FormSelect from '@/components/Display/FormSelect.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'ManageReviews',
    components:{
        FormSelect
    },
    props: {
        book : {
            type: Object,
            required: false,
            default : {},
        },
        review : {
            type : Object,
            required: false,
            default: {},
        },
        books : {
            type : Array,
            required: false,
            default: [],
        },
        editMode : {
            type : Boolean,
            required: false,
            default: false,
        },
    },
    data(){
        return{
            form: {},
            errors: {},
            loading: false, 
        }
    },
    created(){
        window.eventTransmitter.$on('deleteReview', this.deleteReview);
    },
    methods: {
        ...mapActions({
            add: 'reviews/addAction',
            delete: 'reviews/deleteAction',
            update: 'reviews/updateAction',
            updateBookRating: 'books/updateBookRatingAction'
        }),
        formHandler(){
            if(this.editMode){
                this.updateReview();
            }else{
                this.createReview();
            }
        },
        createReview(){
            this.errors = {};
            this.loading = true;
            this.add(this.form)
            .then((response) =>{
                 this.loading = false;
                 this.resetBookRating(response.data.data);
                 this.clearModal();
                 this.$noty.success("Review Added!");
            })
            .catch(({response}) => {
                 this.loading = false;
                 this.handleErrors(response);
             });
        },
        updateReview(){
            this.errors = {};
            this.loading = true;
            this.update(this.form)
            .then(response =>{
                this.loading = false;
                this.resetBookRating(response.data.data);
                this.clearModal();
                this.$noty.success("Review Updated!");
            })
            .catch(({response}) => {
                 this.loading = false;
                 this.handleErrors(response);
             });
        },
        deleteReview(){
             SwalDelete.fire('Delete This Review?').then((result) => {
                if (result.value) {
                    this.loading = true;
                    let deletedReview = {...this.review};
                    this.delete(this.review)
                    .then(response =>{
                        this.loading = false;
                        this.$noty.success("Review Deleted!");
                        this.resetBookRating(deletedReview);
                    })
                    .catch((response) => {
                        this.loading = false;
                        this.handleErrors(response);
                    });
                }
            })
        },
        clearModal(){
            this.errors = {};
            let modal = M.Modal.getInstance($('#review-modal'));
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
        },
        resetBookRating(review = null){
            // If currentBookId is set in the state, check if books rating has changed on review update, 
            // and if it did, update the rating of that book
            // Otherwise get a recalculated book rating in the state and update book rating
            if(this.book && this.book.id && (this.book.rating != this.bookRating)){
                this.updateBookRating({'bookId': this.book.id, 'newRating': this.bookRating});

            }else if(review !== null){
                let newRating = this.bookRatingById(review.book_id);
                this.updateBookRating({'bookId': review.book_id, 'newRating': newRating});
            }else{
                return;
            }
        },
    },
    computed:{
        ...mapGetters({
            bookRating: 'reviews/currentBookRating',
            bookRatingById : 'reviews/bookRatingById'
        }),
    },
    watch:{
        review(){
            this.form = {...this.review}
            this.errors = {}
        }
    }
}
</script>