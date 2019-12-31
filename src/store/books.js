import axios from '../axios'

const state = {
    books: [],
    loaded: false,
}
const getters= {
    allBooks: (state) => {
        return state.books;
    },
    loadedState: (state) => {
        return state.loaded;
    },
    itemCount(state){
        return state.books.length;
    },
    bestRatedBooks(state){
        let fiveStarBooks = state.books.filter(book =>{
            return book.rating == "5";
        });
        let fourStarBooks = state.books.filter(book =>{
            return book.rating == "4";
        });
        let bestBooks = fiveStarBooks;
        if(bestBooks.length < 8){
            bestBooks = fiveStarBooks.concat(fourStarBooks);
        }  
        if(bestBooks.length < 4){
            let threeStarBooks = state.books.filter(book =>{
                return book.rating == "3";
            });
            bestBooks = bestBooks.concat(threeStarBooks);
        }  
        return bestBooks;
    },
}
const mutations = {
    setBooks : (state, books) =>{
        state.books = books;
    },
    setLoadedState(state, payload){
       state.loaded = payload;  
    },
    addBook: (state, book) => {
        state.books.unshift(book);
    },
    updateBook: (state, book) => {
        const index = state.books.findIndex(item => item.id == book.id);
        if(index !== -1){
            state.books.splice(index, 1, book);
        }
    },
    removeBook: (state, book) => {
        state.books = state.books.filter((item) =>{
            return item.id != book.id;
         });
    },
    updateBookRating: (state, payload) => {
        const index = state.books.findIndex((book) => book.id == payload.bookId);
        if(index !== -1){
            const book = {...state.books[index]};
            book.rating = payload.newRating;
            state.books.splice(index, 1, book);
        }
    }
}

const actions = {
    loadBooks: (state, payload) => {
        return new Promise((resolve, reject) => {
          axios.get('/books')
          .then((response) => {
              if(response.data.data){
                state.commit('setBooks', response.data.data);
                state.commit('setLoadedState', true);
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
            axios.post('/books', payload)
            .then((response) => {
                if(response.status == 201 && response.data.data){
                    state.commit('addBook', response.data.data);
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
    updateAction: (state, book) => {
        return new Promise((resolve, reject) => {
            axios.put(`/books/${book.id}`, book)
            .then((response) => {
                if(response.status == 200 && response.data.data){
                    state.commit('updateBook', response.data.data);
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
    deleteAction: (state, book) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/books/${book.id}`)
            .then((response) => {
                if(response.status == 200){
                    state.commit('removeBook', book);
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
    updateBookRatingAction: (context, payload) => {
         context.commit('books/updateBookRating', payload, { root:true});
    }
}
export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
});