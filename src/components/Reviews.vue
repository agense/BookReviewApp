<template>
    <div class="section" v-if="!loading">
        <div class="row flex-container separated">
            <div class="flex-left">
                <h2 class="left-align">Reviews</h2>
                <div class="total-reviews grey-text">Total Reviews: {{reviewCount}}</div>
            </div>
            <div class="flex-right">
                <a v-if="authenticated" @click="openAddModal" class="btn-floating btn waves-effect waves-light teal lighten-2 right-align">
                    <i class="material-icons">add</i>
                </a>
                <router-link to="/login" v-else class="waves-effect waves-light btn">Login To Add</router-link>
            </div>
        </div>
        <!--Start of review display-->
        <div v-if="reviewCount > 0">
            <paginator :items="sortedByAuthor">
                <template slot-scope="{collection}"> 
                    <div class="row">
                        <div class="card" :class="{' brown lighten-5':isAuthor(review)}" v-for="review in collection" :key="review.id">
                            <div class="card-content flex-container">
                                <div class="d-block">
                                    <star-rating :rating="review.rating"></star-rating><br/>
                                    <div class="small-block-line grey-text text-darken-2">
                                        <span v-if=" isAuthor(review)" class="badge teal author-badge">My Review</span>
                                        <span v-else class="grey-text text-darken-2">Review By: {{review.review_author}} | </span>
                                        <span> On: {{review.review_date}}</span>
                                    </div>
                                </div>
                                <div v-if=" isAuthor(review)" class="btn-holder">
                                <a @click="deleteItem(review)" class="btn-floating btn-small waves-effect waves-light right grey darken-4"><i class="material-icons">delete</i></a>
                                <a @click="openEditModal(review)" class="btn-floating btn-small waves-effect waves-light right bggold mr-1"><i class="material-icons">edit</i></a>
                                </div>                    
                            </div>
                            <div class="card-action">
                                <div class="align-left"> {{review.review}}</div>
                            </div>
                        </div>
                    </div>
                </template>    
            </paginator>
        </div>
        <!--End of review display-->
        <div class="row" v-else>
            <p class="left-align">There are no reviews for this book yet.</p>
        </div>
        <!--Manage Reviews and Modal -->
        <manage-reviews :review="review" :editMode="editMode" :book="book" :books="null"></manage-reviews>
    </div>
    <div class="progress" v-else>
        <div class="indeterminate"></div>
    </div>
</template>

<script>
import StarRating from '@/components/Display/StarRating.vue'
import ManageReviews from '@/components/ManageReviews.vue'
import Paginator from '@/components/Paginator.vue'

import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Reviews',
    props:{
        book:{
            type: Object,
            required: false,
            default: {}
        }
    },
    components:{
        StarRating, 
        ManageReviews,
        Paginator
    },
    data(){
        return {
            review:{},
            editMode: false,
            errors: {},
            loading: true,
        }
    },
    created(){
        this.loadReviews();
    },
    methods:{
        ...mapActions({
            loadBookReviews : 'reviews/loadBookReviews',
        }),
        loadReviews(){
            this.loadBookReviews(this.book.id)
            .then(() => {
                this.loading = false;
            })
            .catch(() => {
                this.loading = false;
                this.$noty.error("There was an error. Reviews were not found");
            });
        },
        openAddModal(){
            this.review = {};
            if(this.book && this.book.id){
                this.review.book_id = this.book.id;
            }
            this.editMode = false;
            this.openModal();
        },
         openEditModal(review){
            this.review = review;
            this.editMode = true;
            this.openModal();
        },
        deleteItem(review){
            this.review = review;
            window.eventTransmitter.$emit('deleteReview');
        },
        isAuthor(review){
            return this.$store.getters['auth/isOwner'](review.review_author_id);
        },
        openModal(){
            var modal = document.getElementById('review-modal');
            var modInstance = M.Modal.init(modal);  
            modInstance.open();
        },
    },
    computed: {
        ...mapGetters({
            reviews : 'reviews/reviewList',
            reviewCount: 'reviews/itemCount',
            authUser : 'auth/authUser',
            authenticated : 'auth/authenticated',
        }), 
        sortedByAuthor(){
           if(!this.authenticated){
              return this.reviews;
          }
          const userReviews = [];
          const otherReviews = [];
          this.reviews.forEach(item => {
              if(item.review_author_id == this.authUser.id){
                  userReviews.push(item);
              }else{
                  otherReviews.push(item);
              }
          });
          return userReviews.concat(otherReviews);
        },
    },
}
</script>
<style scoped>
.card-content {
    text-align: left;
    padding: 0.5rem 2rem;
}
.card-action{
    padding: 1rem 2rem;
    text-align: left;
    font-size: 0.9rem;
}
.total-reviews{
    text-align: left;
    margin-top: -10px;
}
.author-badge{
    font-size: 0.7rem;
    text-transform: uppercase;
    color: #fff;
    float: left;
    margin-left:0;
    margin-right:14px;
    min-width: 80px;
}
.btn-holder{
    min-width: 80px;
}
</style>