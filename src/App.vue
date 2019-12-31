<template>
  <div id="app">
    <!--Navigation-->
      <Navbar />
    <!--Routed Content-->
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import {mapActions} from 'vuex'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  }, 
  created(){
        this.loadAuthors();
        this.loadGenres();
        this.loadBooks().then( () => {this.booksLoaded = true});
        this.resetAuthState();
  },
  methods:{
     ...mapActions({
      resetAuthState : 'auth/resetAuthState',
      loadGenres : 'genres/loadGenres',
      loadAuthors : 'authors/loadAuthors',
      loadBooks : 'books/loadBooks',
    }), 
  },
  watch: {
    //Set Dynamic Page Title
    '$route' (to, from) {
      document.title = to.meta.title ? (this.$root.appName + ' | ' + to.meta.title) : this.$root.appName;
    }
  },
}
</script>

