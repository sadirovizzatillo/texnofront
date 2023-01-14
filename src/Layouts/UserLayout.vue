<template>
    <div>
        <el-container>
            <el-header class="header">
                <TheHeader />
            </el-header>
            <div class="categories-wrapper">
                <TheCategories :category="category" v-for="(category, id) in categories" :key="id"/>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
            <div class="the-footer">
                <TheFooter />
            </div>
        </el-container>
    </div>
</template>


<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheCategories from '@/components/TheCategories.vue';
import store from '@/store';
export default {
    mounted(){
        store.dispatch("category/getCategories")
    },
    components:{
        TheHeader,
        TheCategories,
        TheFooter
    },
    computed:{
        categories(){
            return store.state.category?.categories
        }
    }
    
}
</script>

<style>
.main .el-container{
    max-width: 1200px !important;
    margin: 0 auto;
}
.el-header{
    padding: 0 !important;
}
.main{
    padding: 20px;
    margin: 0 auto;
    max-width: 1220px;
    width: 100%;
    margin-bottom: 32px;
}
.header{
    margin: 0 auto;
    max-width: 1220px;
    width: 100%;
    padding:0 20px;
}
.categories-wrapper{
    margin: 0 auto;
    max-width: 1220px;
    width: 100%;
    padding: 20px 20px 0px;
    display: flex;
    align-items: flex-start;
}
.the-footer{
    margin: 0 auto;
    max-width: 1220px;
    width: 100%;
    padding: 40px 20px;
}
</style>
