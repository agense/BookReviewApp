<template>
    <div v-if="!loading">
        <div class="itemDisplay">
            <slot :collection="collection"></slot>
        </div> 
        <p class="index-display left-align" v-if="displayIndexes">
            Showing Results: {{pagination.startIndex +1}} to {{pagination.endIndex +1}} of {{allItems.length}}
        </p>
        <div class="pagination-holder mb-1 mt-2">
        <ul class="pagination right-align" v-if="showPagination">
            <li v-if="prevExists"><a href="#!"><i class="material-icons" @click.prevent="setPrev()">chevron_left</i></a></li>
            <li class="waves-effect" v-for="(page, index) in pagination.pages" :key="index"  :class="{'active': currentPage== page}">
                <a href="#!" @click.prevent="setPage(page)">{{page}}</a>
            </li>
            <li class="waves-effect" v-if="nextExists"><a href="#!"  @click.prevent="setNext()"><i class="material-icons">chevron_right</i></a></li>
        </ul>
        </div>  
    </div>  
    <div class="progress" v-else>
        <div class="indeterminate"></div>
    </div>
</template>

<script>
export default {
    name:'Paginator',
    props:{
        items: {
            type: Array,
            required: true,
            default : [],
        },
        resultsPerPage: {
            type: [Number, String],
            required: false,
            default: 10
        },
        displayIndexes: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data(){
        return{
            perPage: this.resultsPerPage,
            currentPage: 1,
            pagination: {},
            loading: true,
        }
    },
    computed:{
        allItems(){
            return this.items;
        },
        collection(){
            return this.paginate();
        },
        totalItems(){
            return this.allItems.length;
        },
        lastPage(){
            return this.pagination.pages.length;
        },
        prevExists(){
            return this.currentPage > 1;
        },
        nextExists(){
            return this.currentPage < this.lastPage;
        },
        showPagination(){
            return this.pagination.pages.length > 1;
        },
    },
    methods:{
        setPage(page){
            this.currentPage = page;
            this.pagination = this.paginator();
        },
        setPrev(){
            if(this.prevExists){
                this.setPage(this.currentPage - 1);
                this.pagination = this.paginator();
            }
        },
        setNext(){
            if(this.nextExists){
                this.setPage(this.currentPage + 1);
                this.pagination = this.paginator();
            }
        },
        paginate(){
            return this.$_.slice(this.allItems, this.pagination.startIndex, this.pagination.endIndex + 1);
        },
        paginator(){
            var startIndex = (this.currentPage - 1) * this.perPage;
            var endIndex = Math.min(startIndex + parseInt(this.perPage) -1, this.totalItems -1);
            return { 
                currentPage: this.currentPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: this.$_.range(1, Math.ceil(this.totalItems/this.perPage)+1)
            }
        }
    },
    created(){
        this.setPage(1);
        if(this.allItems.length > 0){
            this.loading = false;
        }
    },
    watch:{
        allItems(){
            if(this.allItems.length > 0){
                this.loading = false;
                this.setPage(1);
            }
        },
    }   
}
</script>
<style scoped>
.pagination-holder:before{
  content: "";
  clear: both;
  display: table;
}
.pagination li a{
    font-size: 1rem;
}
.pagination li.active {
    background-color: lightseagreen;
}
.pagination li.active a {
    color: #fff;
}
.index-display{
    display: block !important;
    font-size: 0.9rem;
    padding: 0.25rem;
    font-family: "Lato";
    font-style: italic;
    margin-left: 0.25rem;
}
</style>