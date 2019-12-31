import Vue from 'vue'
import Vuex from 'vuex'

//Modules
import auth from './auth'
import genres from './genres'
import authors from './authors'
import books from './books'
import reviews from './reviews'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{

    },
    mutations:{

    },
    actions:{

    },
    modules: {
        auth,
        genres,
        authors,
        books,
        reviews
    }
});