<template>
    <div v-if="itemCount">
        <select v-model="selected" :id="`${item}-list`" @change="$emit('selected', selected)">
        <option v-if="allfield" value="all">All</option>
        <option v-for="item in items" :key="item.id" :value="item[`${valuefield}`]">{{item[`${showfield}`]}}</option>
        </select>
        <label>{{label}}</label>
    </div>
</template>
<script>
export default {
    name: 'FormSelect',
    props: {
        items : {
            required : true,
            type: Array,
         },
        item : {
            type: String,
            required : true,
         },
         valuefield: {
            type: String,
            required : false, 
            default: "id",
         },
        showfield: {
            type: String,
            required : false, 
            default: "name",
         },
        allfield: {
            type: Boolean,
            required : false, 
            default: false,
         },
         label : {
            type: String,
            required : false, 
            default: 'Select',
         },
         preselected : {
            type: [Number,String],
            required : false, 
            default: '',
         }
    },
    data(){
        return {
            selected : '',
            list_id : this.item + "-list",
        }
    },
    methods:{
        initSelect(){
            setTimeout(()=>{
                $("#" + this.list_id).formSelect();
            }, 500)
        },
    },
    mounted(){
        this.itemsAvailable;
        this.selected = this.preselected;
    },
    computed:{
       itemsAvailable(){
            if(this.items.length > 0){
                this.initSelect();
                return true;
            }
            return false;
        },
        itemCount(){
            return this.items.length;
        },
    },
    watch: { 
        items: function(value){  
            this.itemsAvailable;
        },
        preselected: function(){  
            this.selected = this.preselected;
            this.initSelect();
        },
    }
}
</script>
<style scoped>
.fm-input .select-wrapper + label {
    position: absolute;
    top: -20px;
    font-size: .8rem;
    left: 0;
}
.fm-input .select-wrapper input{
    height:2rem!important;
    line-height: 2rem;
    max-height: 2rem;
}
.select-wrapper .dropdown-content li {
    min-height: 30px;
    line-height: 1rem;
}
.select-wrapper .dropdown-content li > a, .dropdown-content li > span {
    font-size: 15px;
    color: #26a69a;
    display: block;
    line-height: 22px;
    padding: 8px 16px;
}
</style>