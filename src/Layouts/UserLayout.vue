<template>
    <div>
        <el-container>
            <el-header class="header">
                <TheHeader />
            </el-header>
            <div class="main">
                <router-view></router-view>
            </div>
        </el-container>
    </div>
</template>


<script>
import TheHeader from '@/components/TheHeader.vue';
export default {
    components:{
        TheHeader
    }
}
</script>

<style>
.main .el-container{
    max-width: 1200px !important;
    margin: 0 auto;
}
.main{
    padding: 20px;
    margin: 0 auto;
    max-width: 1220px;
    width: 100%;
}
.header{
    margin: 0 auto;
    max-width: 1320px;
    width: 100%;
}
</style>
