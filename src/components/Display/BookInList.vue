<template>
    <div class="card small hoverable">
        <div class="card-image">
            <img :src="book.image" v-if="book.image" class="responsive-img">
            <img src="../../assets/img/book_main.png" v-else class="default-book-img">
            <span class="card-title book-genre"><span class="badge teal">{{book.genre}}</span></span>
        </div>
        <div class="card-content">
            <div>
                <span class="left-align d-block">{{book.title}}</span>
                <span class="small-block-line grey-text">By: {{book.author}}</span>
            </div>
        </div>
        <div class="card-action">
            <star-rating :rating="book.rating"></star-rating>
            <router-link :to="`/books/${book.id}`" class="right txt-gold">View</router-link>
        </div>
    </div>
</template>

<script>
import StarRating from '@/components/Display/StarRating.vue'
export default {
    name: 'BookInList',
    components:{
        StarRating, 
    },
    props: {
        book:{
            type: Object,
            required: true,
        }
    }
}
</script>
<style scoped>
.card .card-content {
    padding: 1rem 1.25rem;
    border-radius: 0 0 2px 2px;
    text-align: left;
}
.card .card-action {
    padding: 0.75rem;
}
.book-genre{
    padding: 0!important;
    margin: 0;
}
.book-genre span{
color: #fff;
text-transform: uppercase;
font-size: 0.8rem;
margin-left: 0;
}
.card.small .card-image {
    max-height: 60%;
    overflow: hidden;
    min-height: 180px;
}
.card.small .card-image img{
    min-height: 180px;
}
.card.small {
    height: 330px;
}
@media screen and (max-width: 566px) {
.card.small {
    height: 380px;
}
.card.small .card-image {
    min-height: 250px;
}
.card.small .card-image img{
    min-height: 250px;
}
}
</style>