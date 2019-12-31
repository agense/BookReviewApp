<template>
<footer class="page-footer black">
        <span>{{appName}} &copy; {{currentYear}}</span>
</footer>
</template>
<script>
export default {
    name: 'Footer',
    data(){
        return{
            currentYear: new Date().getFullYear(),
            appName: this.$root.appName,
        }
  
    }
}
</script>