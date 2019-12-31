import axios from '../axios'

const state = {
    genres: []
}
const getters= {
    allGenres: (state) => {
        return state.genres;
    },
    itemCount(){
        return state.genres.length;
    }
}
const mutations = {
    setGenres : (state, genres) =>{
        state.genres = genres;
    },
    addGenre: (state, genre) => {
        state.genres.unshift(genre);
    },
    updateGenre: (state, genre) => {
        const index = state.genres.findIndex(item => item.id == genre.id);
        if(index !== -1){
            state.genres.splice(index, 1, genre);
        }
    },
    removeGenre: (state, genre) => {
        state.genres = state.genres.filter((item) =>{
            return item.id != genre.id;
         });
    }
}

const actions = {
    loadGenres: (state, payload) => {
        return new Promise((resolve, reject) => {
          axios.get('/genres')
          .then((response) => {
              if(response.data.data){
                state.commit('setGenres', response.data.data);
                resolve(response);
              }
          })
          .catch((error)=>{
              reject(error);
          })
        });
    },
    addAction: (state, payload) => {
        return new Promise((resolve, reject) => {
            axios.post('/genres', payload)
            .then((response) => {
                if(response.status == 201 && response.data.data){
                    state.commit('addGenre', response.data.data);
                    resolve(response);
                }else{
                    reject(response);
                }
             })
             .catch((error) => {
                 reject(error);
             })
        });
    },
    updateAction: (state, genre) => {
        return new Promise((resolve, reject) => {
            axios.put(`/genres/${genre.id}`, genre)
            .then((response) => {
                if(response.status == 200 && response.data.data){
                    state.commit('updateGenre', response.data.data);
                    resolve(response);
                }else{
                    reject(response);
                }
             })
             .catch((error) => {
                 reject(error);
             })
        });
    },
    deleteAction: (state, genre) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/genres/${genre.id}`)
            .then((response) => {
                if(response.status == 200){
                    state.commit('removeGenre', genre);
                    resolve(response);
                }else{
                    reject(response);
                }
             })
             .catch((error) => {
                 reject(error);
             })
        });
    }
}
export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
});