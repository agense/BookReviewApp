<template>
<div class="carousel-slider-holder">
    <carousel :margin="20" :responsive="carouselSettings">
        <slot name="slidercontent"></slot>
        <template slot="prev">
            <span class="prev"><span class="icon-holder"><i class="material-icons">navigate_before</i></span></span>
        </template>
        <template slot="next">
            <span class="next"><span class="icon-holder"><i class="material-icons">navigate_next</i></span></span>
        </template>
    </carousel>
</div>    
</template>
<script>
import carousel from 'vue-owl-carousel'
export default {
    name: 'CarouselSlider',
    components:{
        carousel
    },
    data(){
        return{
            carouselSettings: {
                0:{items:1,nav:false,dots:false}, 
                568:{items:2,nav:false,dots:true},
                768:{items:3,nav:false,dots:true},
                1100:{items:4,nav:false,dots:true}
            }
        }
    },
}
</script>
<style scoped>
.prev{
    position:absolute;
    bottom:0px;
    left: calc(50% - 30px);
    z-index: 9999;
}
.next{
    position:absolute;
    bottom:0px;
    right: calc(50% - 30px);
    z-index: 9999;
}
.prev:hover, .next:hover{
    cursor:pointer;
}
.icon-holder{
    display: block;
    background: #111;
    height: 25px;
    width: 25px;
    color: #fff;
}
.owl-carousel.owl-loaded{
    padding-bottom: 15px!important;
}
@media screen and (min-width: 568px) {
    .prev{
        display:none;
    }
    .next{
        display:none;
    }
}
@media screen and (max-width: 567px) {
    .carousel-slider-holder{
        position:relative;
        padding-bottom:30px;
    }
}
</style>