<template>
<div class="row">
    <div class="col s12">
        <div class="card horizontal">
        <div class="card-image">
            <div class="card-img-holder valign-wrapper">
            <img :src="book.image" v-if="book.image" class="responsive-img">
            <img src="../../assets/img/book_main.png" v-else class="default-book-img">
            </div>
        </div>
        <div class="card-stacked">
            <div class="card-content left">
            <slot name="manage-buttons"></slot>    
            <div class="d-block mb-2">
                <span class="badge teal indicator-badge">{{book.genre}}</span>
            </div>
            <star-rating :rating="bookRating"></star-rating><br/>
            <div class="mt-1 d-block">
                <div class="card-title">{{book.title}}</div>
                <div class="grey-text mini-subtitle">By: {{book.author}}</div>
            </div>
            <div class="grey-text mt-1">Pub.Year: {{book.publication_year}}</div>
            <div v-html="book.description" class="left mt-2"></div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import StarRating from '@/components/Display/StarRating.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'BookSingle',
    components:{
        StarRating
    },
    props: {
        book: {
            type: Object,
            required: true,
        }
    },
    computed:{
        ...mapGetters({
            bookRating: 'reviews/currentBookRating',
        }),
    }
}
</script>

<style scoped>
.card.horizontal {
    min-height: 380px;
}
.card.horizontal .card-stacked .card-content{
    text-align:left;
}
.card.horizontal .card-image{
    width:280px;
    max-width: 40%;
    min-height:100%;
}
.card-img-holder{
    min-height: 380px;
    height: 100%;
}
.card.horizontal .card-img-holder img {
    border-radius: 2px 0 0 2px;
    max-width: 100%;
    width: auto;
    min-height: 100%;
    object-fit: cover;
    height: 100%;
}
.card.horizontal .card-img-holder .default-book-img{
    max-width: 300px;
    max-height: 350px;
    width: 300px;
    height: 350px;
}
.mini-subtitle{
    font-family: "Lato";
    font-size: 1.05rem;
    font-style: italic;
}
.card .card-title {
    font-size: 24px;
    font-weight: 600;
    font-family: "Lato";
}
@media screen and (max-width: 768px) {
.card.horizontal{
    display:block!important;
}
.card.horizontal .card-image{
    max-width:100%;
    width:100%;
    max-height:400px;
    overflow:hidden;
}
}
@media screen and (max-width: 560px) {
.card.horizontal .card-img-holder .default-book-img{
    max-width: 200px;
    max-height: 250px;
    width: 300px;
    height: 350px;
}
}
</style>