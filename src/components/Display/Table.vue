<template>
    <div class="row">
        <div class="col s12">
            <table class="highlight">
                <thead>
                <tr>
                    <slot name="headers"></slot>
                </tr>
                </thead>
                <tbody>
                    <slot name="content"></slot>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Table',
}
</script>
<style scoped>
thead{
   background-color:  rgba(50,50,50,0.06);
}
</style>