<template>
    <div>
        <!--Admin Menu-->
        <admin-menu></admin-menu>
        <!--End Admin Menu-->

        <div class="admin-area">
        <div class="section container">
            <!--Page Header-->
            <actionable-header v-on:addmodal="openAddModal">
                <template v-slot:title>Reviews</template>
                <template v-slot:totals>Total: {{itemCount}}</template>
            </actionable-header>
            <!--Page Header-->

            <!--Paginated Content-->
            <paginator :items="reviews">
            <template slot-scope="{collection}">   
                    <content-table>
                        <template v-slot:headers>
                            <th>Rating</th>
                            <th>Review Author</th>
                            <th>Date</th>
                            <th>Book</th>
                            <th></th>
                        </template>
                        <template v-slot:content>
                            <tr v-for="review in collection" :key="review.id">
                               <td class="rating-col"><star-rating :rating="review.rating"></star-rating></td>
                                <td>{{review.review_author}}</td>
                                <td>{{review.review_date}}</td>
                                <td>
                                    {{review.book}}
                                    <span class="small-text grey-text">By: {{review.book_author}}</span>
                                </td>
                                <td class="btn-group-triple">
                                    <a @click="deleteItem(review)" class="btn-floating btn-small waves-effect waves-light right black"><i class="material-icons">delete</i></a>     
                                    <a @click="openShowModal(review)" class="btn-floating btn-small waves-effect waves-light right teal mr-1"><i class="material-icons">visibility </i></a>
                                    <a v-if="isAuthor(review)" @click="openEditModal(review)" class="btn-floating btn-small waves-effect waves-light right bggold mr-1"><i class="material-icons">edit</i></a>  
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
    <manage-reviews :review="review" :editMode="editMode" :book="book" :books="books"></manage-reviews>
    <show-modal :review="review"></show-modal>
    <!-- End Modal component with actions-->
    </div>
</template>

<script>
import AdminMenu from '@/components/AdminMenu.vue'
import ManageReviews from '@/components/ManageReviews.vue'
import ShowModal from '@/components/Display/ShowReviewModal.vue'
import StarRating from '@/components/Display/StarRating.vue'
import Paginator from '@/components/Paginator.vue'
import ContentTable from '@/components/Display/Table.vue'
import ActionableHeader from '@/components/Display/ActionableHeader.vue'

import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'AdminReviews',
    components:{
        AdminMenu,
        ContentTable,
        ManageReviews,
        ShowModal,
        StarRating,
        Paginator,
        ActionableHeader
    },
    data(){
        return {   
            review: {},
            book: null,
            editMode: false,
        }
    },
    created(){
        this.loadReviews();
    },
    mounted(){
        $('#review-modal').modal();
        $('#show-review-modal').modal();
    },
    methods:{
        ...mapActions({
            loadReviews : 'reviews/loadAllReviews',
        }), 
         openAddModal(){
            this.review = {},
            this.book = null,
            this.editMode = false;
            this.openModal('review-modal');
        },
        openEditModal(review){
            this.review = review;
            this.book = {'id': review.book_id, 'title': review.book};
            this.editMode = true;
            this.openModal('review-modal');
        },
        openShowModal(review){
            this.review = review;
            this.openModal('show-review-modal');
        },
        deleteItem(review){
            this.review = review;
            window.eventTransmitter.$emit('deleteReview');
        },
        openModal(modalId){
            $('#review-modal').modal();
            let modal = M.Modal.getInstance($(`#${modalId}`));
            modal.open();
        },
        isAuthor(review){
             return this.$store.getters['auth/isOwner'](review.review_author_id);
        },
    },
    computed:{
        ...mapGetters({
            reviews : 'reviews/reviewList',
            itemCount: 'reviews/itemCount',
            books: 'books/allBooks'
        }),
    }
}
</script>
