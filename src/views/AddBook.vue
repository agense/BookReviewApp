<template>
        <manage-books :book="book" :editMode="false"></manage-books>
</template>

<script>
import ManageBooks from '@/components/ManageBooks.vue'
export default {
    name: 'AddBook',
    components:{
        ManageBooks,
    },
    data(){
        return {
            book: {
                'title': '',
                'description': '',
                'publication_year': null,
                'genre_id': null,
                'author_id': null,
                'image' : null,
            },
        }
    }
}
</script>