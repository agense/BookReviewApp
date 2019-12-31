<template>
    <div>
        <admin-menu></admin-menu>
            <div class="admin-area">
                <div class="section container">
                    <div class="row">
                        <div class="col s12 mb-1">
                            <h2 class="left-align">Admin Dashboard</h2>
                            <div v-if="!loading">
                                <div class="row">
                                    <div class="col s12 m6">
                                        <stats-card title="Genres" :total="statistics.genreCount" :linkto="'/admin/genres'"></stats-card>
                                    </div>
                                    <div class="col s12 m6">
                                        <stats-card title="Authors" :total="statistics.authorCount" :linkto="'/admin/authors'"></stats-card>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 m6">
                                        <stats-card title="Books" :total="statistics.bookCount" :linkto="'/admin/books'"></stats-card>
                                    </div>
                                    <div class="col s12 m6">
                                        <stats-card title="Reviews" :total="statistics.reviewCount" :linkto="'/admin/reviews'"></stats-card>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 m6">
                                        <stats-card title="Members" :total="statistics.userCount" :linkto="'/admin/members'"></stats-card>
                                    </div>
                                    <div class="col s12 m6">
                                        <stats-card title="Administrators" :total="statistics.adminCount" :linkto="'#'"></stats-card>
                                    </div>
                                </div>
                            </div>
                                <div class="progress" v-else>
                                    <div class="indeterminate"></div>
                                </div>
                        </div>  
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import axios from '../../axios'
import AdminMenu from '@/components/AdminMenu.vue'
import StatsCard from '@/components/Display/StatsCard.vue'

export default {
    name: 'AdminDashboard',
    components:{
        AdminMenu,
        StatsCard,
    },
    data(){
        return{
            'statistics' : {},
            'loading' : true,
        }
    },
    created(){
        this.loadStatistics();
    },
    methods:{
        loadStatistics(){
            axios.get('/statistics')
            .then(response => {
                this.loading = false;
                this.statistics = response.data.data;
            })
            .catch(() => {
                this.loading = false;
                this.$noty.error("There was an error. Statistics data can not be loaded");
            })
        }
    }
}
</script>