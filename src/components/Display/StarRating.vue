<template>
    <div >
        <div v-if="stars" v-html="stars"></div>
    </div>    
</template>
<script>
export default {
    name: 'StarRating',
    props: {
        rating : {
            type: [Number, String],
            required : false,
            default: 0,
        }
    },
    computed:{
        emptyStars(){
            return Number(5 - Number(this.rating));
        },
        stars(){
            let html = "";
            if(this.rating > 0){
                for(let i = 1; i <= this.rating; i++){
                    html += '<span class="left"><i class="material-icons tiny yellow-text text-darken-3">star</i></span>';
                }
            }
            if(this.emptyStars > 0){
                for(let j = 1; j <= this.emptyStars; j++){
                    html += '<span class="left"><i class="material-icons tiny grey-text text-lighten-1">star</i></span>';
                }
            }
            return html;
        }
    },
}
</script>
<style scoped>
i.tiny {
    font-size: 1rem !important;
    margin-right: 0 !important;
    width: auto !important;
}
</style>