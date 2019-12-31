<template>
    <!-- Modal -->
    <div href="" id="show-review-modal" class="modal">
        <div class="modal-content">
            <div class="section">
                <h2>Review Details</h2>
                <div class="divider mb-2"></div>
                <div class="card  brown lighten-5">
                    <div class="card-content flex-container">
                        <div class="d-block">
                            <star-rating :rating="review.rating"></star-rating><br/>
                            <span class="small-block-line grey-text">Review By: {{review.review_author}}
                                | On: {{review.review_date}}
                            </span>
                        </div>    
                        <div>
                            <div>Book: {{review.book}}</div>
                            <div class="small-block-line grey-text">By: {{review.book_author}}</div>
                        </div>               
                    </div>
                    <div class="card-action">
                        <div class="align-left"> {{review.review}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import StarRating from '@/components/Display/StarRating.vue'
export default {
    name: 'ShowReviewModal',
    components:{
        StarRating
    },
    props:{
        review: {
            type: Object,
            required: true,
        }
    }
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
</style>