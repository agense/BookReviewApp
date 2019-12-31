import axios from '../axios'

const state = {
    /*
    Reviews array holds all reviews for all books if its loaded in adminReviews component by admin user.
    Otherwise it holds reviews of a currently loaded book, which can be seen by any user.
    Each component makes a server call to reload the required data to state.
    */
   currentBookId: null,
   reviews: [],
}
const getters= {
    reviewList: (state) => {
        return state.reviews;
    },
    itemCount(state){
        return state.reviews.length;
    },
    currentBookRating(state){
        if(state.currentBookId !== null && state.reviews.length > 0){
            let total = state.reviews.reduce((currentTotal, item) => {
             return (Number(item.rating) + currentTotal)
            }, 0);
            return Math.round(total/state.reviews.length);
        }
        return null;
    },
    bookRatingById: (state) => (bookId = null) => {
        var bookReviews;
        if(bookId !== null){
            bookReviews = state.reviews.filter((item) => {
                return item.book_id == parseInt(bookId)            
        });
        if(bookReviews.length > 0){
            let total = bookReviews.reduce((currentTotal, item) => {
                return (Number(item.rating) + currentTotal)
                }, 0);
            return Math.round(total/bookReviews.length);
        }
      }
      return null;
    }
}
const mutations = {
    setCurrentBookId:(state, bookId) => {
        state.currentBookId = bookId;
    },
    setReviews : (state, reviews) =>{
        state.reviews = reviews;
    },
    addReview: (state, review) => {
        state.reviews.unshift(review);
    },
    updateReview: (state, review) => {
        let index = state.reviews.findIndex(item => item.id == review.id);
        if(index !== -1){
            state.reviews.splice(index, 1, review);
        }
    },
    removeReview: (state, review) => {
        state.reviews = state.reviews.filter((item) =>{
            return item.id != review.id;
         })
    }
}
const actions = {
    //all reviews are loaded only for admin users in admin panel.
    //When all reviews are loaded, currentBookId is set to empty.
    loadAllReviews: (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.get('/reviews')
                .then((response) => {
                    if(response.data.data){
                      context.commit('setCurrentBookId', null);
                      context.commit('setReviews', response.data.data);
                      resolve(response);
                    }
                })
                .catch((error)=>{
                    reject(error);
                })
              });
    },
    //current book reviews are loaded for each book for any user
    loadBookReviews: (context, bookId) => {
        return new Promise((resolve, reject) => {
            axios.get(`/reviews?book_id=${bookId}`)
            .then((response) => {
                if(response.data.data){
                  context.commit('setCurrentBookId', bookId);
                  context.commit('setReviews', response.data.data);
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
            axios.post('/reviews', payload)
            .then((response) => {
                if(response.status == 201 && response.data.data){
                    state.commit('addReview', response.data.data);
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
    updateAction: (state, review) => {
        return new Promise((resolve, reject) => {
            axios.put(`/reviews/${review.id}`, review)
            .then((response) => {
                if(response.status == 200 && response.data.data){
                    state.commit('updateReview', response.data.data);
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
    deleteAction: (state, review) => {
        return new Promise((resolve, reject) => {
            axios.delete(`/reviews/${review.id}`)
            .then((response) => {
                if(response.status == 200){
                    state.commit('removeReview', review);
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
}
export default ({
    namespaced: true,
    state,
    getters,
    mutations,
    actions
});