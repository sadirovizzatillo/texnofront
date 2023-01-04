<template>
    <div>
        <el-container>
            <el-header>
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
    data(){
        return{
            
        }
    },
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
    padding: 40px 20px;
}


</style>>
