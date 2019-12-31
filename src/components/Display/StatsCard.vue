<template>
    <div class="card brown lighten-5">
        <div class="card-content">
        <h4>{{title}}</h4>
        <p>Total: {{total}}</p>
        </div>
        <div class="card-action" v-if="linkto">
            <router-link :to="linkto" class="waves-effect">Manage {{title}}</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StatsCard',
    props: {
      title: {
          type: String,
          required: true,
      },
      total: {
          type: [Number,String],
          required: true,
      },
      linkto : {
          type: String,
          required: false,
          default: null,
      }
    },
}
</script>