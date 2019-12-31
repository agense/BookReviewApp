<template>
    <div class="row mbn-2">
        <div class="col s12 flex-container v-flex-end">
            <div>
            <h2><slot name="title"></slot></h2>
            <div class="totals grey-text"><slot name="totals"></slot></div>
            </div>
            <div v-if="linkto">
                <router-link :to="linkto" class="btn-floating waves-effect waves-light right">
                    <i class="material-icons">add</i>
                </router-link>
            </div>
            <div v-else-if="noaction"></div>
            <div v-else>
                <a href="#" class="btn-floating waves-effect waves-light right" @click="$emit('addmodal')">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ActionableHeader',
    props: {
        'linkto':{
            type: String,
            required: false,
            default: ""
        },
        'noaction' : {
            type: Boolean,
            required: false,
        }
    }
}
</script>
<style scoped>
.totals{
    text-align:left;
    text-transform:uppercase;
    font-family: 'Lato';
}
h2{
    margin-top:1rem;
}
.btn-floating{
    margin-bottom: 0.5rem;
}
</style>
