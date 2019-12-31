import axios from '../axios'

const state = {
    authors: []
}
const getters= {
    allAuthors: (state) => {
        return state.authors;
    },
    itemCount(){
        return state.authors.length;
    }
}
const mutations = {
    setAuthors : (state, authors) =>{
        state.authors = authors;
    },
    addAuthor: (state, author) => {
        state.authors.unshift(author);
    },
    updateAuthor: (state, author) => {
        const index = state.authors.findIndex(item => item.id == author.id);
        if(index !== -1){
            state.authors.splice(index, 1, author);
        }
    },
    removeAuthor: (state, author) => {
        state.authors = state.authors.filter((item) =>{
            return item.id != author.id;
         });
    }
}

const actions = {
    loadAuthors: (state, payload) => {
        return new Promise((resolve, reject) => {
          axios.get('/authors')
          .then((response) => {
              if(response.data.data){
                state.commit('setAuthors', response.data.data);
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
            axios.post('/authors', payload)
            .then((response) => {
                if(response.status == 201 && response.data.data){
                    state.commit('addAuthor', response.data.data);
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
    updateAction: (state, author) => {
        return new Promise((resolve, reject) => {
            axios.put(`/authors/${author.id}`, author)
            .then((response) => {
                if(response.status == 200 && response.data.data){
                    state.commit('updateAuthor', response.data.data);
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
    deleteAction: (state, author) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/authors/${author.id}`)
            .then((response) => {
                if(response.status == 200){
                    state.commit('removeAuthor', author);
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