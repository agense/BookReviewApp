<template>
    <div>
        <div id="index-banner" class="parallax-container">
            <div class="section no-pad-bot">
            <div class="container">
                <br><br>
                <h1 class="header center teal-text text-lighten-2">Book Review App</h1>
                <div class="row center">
                <h5 class="header col s12 light white-text">Find the books people like! Share your reviews! Add your favorite books!</h5>
                </div>
                <div class="row center">
                <router-link to="/books" class="btn-large waves-effect waves-light teal lighten-1">Find Books</router-link>
                </div>
                <br><br>
            </div>
            </div>
            <div class="parallax"><img src="../assets/img/library.jpg" alt="banner"></div>
        </div>
        <div class="container">
        <div id="book-display" class="section mb-4">
            <h2>Best Rated Books</h2>
            <h3 class="subtitle grey-text">Discover the top book choices of our users!</h3>
            <!--Carousel-Slider-->
            <carousel-slider v-if="loaded">
                <template v-slot:slidercontent>
                    <div v-for="book in bestRatedBooks" :key="book.id">
                        <book-in-list :book="book"></book-in-list>
                    </div>
                </template>
            </carousel-slider>
            <div v-else class="progress">
                <div class="indeterminate"></div>
            </div>
            <!--End Carousel-Slider-->
        </div>
        </div>

        <div class="parallax-container valign-wrapper">
            <div class="section w-100">
                <div v-if="!authenticated" class="row center">
                <h5 class="header col s12 light white-text mb-2">Register now and share your favorite books!</h5>
                 <router-link to="/signup" class="btn-large waves-effect waves-light teal lighten-1">Create New Account</router-link>
                </div>
                <div v-else class="row center">
                <h5 class="header col s12 light white-text mb-2">Add your favorite books to our collection!</h5>
                 <router-link to="/books/add" class="btn-large waves-effect waves-light teal lighten-1">Add A Book</router-link>
                </div>
            </div>
            <div class="parallax"><img src="../assets/img/books.jpg" alt="Bookshelf Image"></div>
        </div>
</div>
    
</template>
<script>
import BookInList from '@/components/Display/BookInList.vue'
import CarouselSlider from '@/components/Display/CarouselSlider.vue'

import {mapGetters} from 'vuex'

export default {
    name: 'LandingPage',
    components:{
        BookInList,
        CarouselSlider
    },
    mounted(){
       $('.parallax').parallax()
    },
    computed:{
        ...mapGetters({
            authenticated : 'auth/authenticated',
            books : 'books/allBooks',
            itemCount: 'books/itemCount',
            bestRatedBooks : 'books/bestRatedBooks',
            loaded: 'books/loadedState'
        }),
    },
}
</script>
<style scoped>
.parallax-container {
    margin-top: -3rem;
    height:460px;
    background: rgba(0,0,0,0.3);
}
.container{
    width:75%;
}
</style>