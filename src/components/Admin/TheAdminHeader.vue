<template>
    <header class="admin-header">
        <h3>{{ headers.title }}</h3>
        <div class="add-btn__wrapper">
            <el-button class="add-brand__btn" v-if="headers.hasAddition" @click="(() => $router.push(`/admin/${headers.goAddition}`))">
                {{ headers.addition }}
            </el-button>
            <el-button class="add-brand__btn" v-if="headers.hasBtn" @click="(() => $router.push(`/admin/${headers.goSubRoute}`))">
                {{ headers.addSubMain }}
            </el-button>
            <el-button class="add-product__btn" @click="(() => $router.push(`/admin/${headers.goRoute}`))">
                {{ headers.addMain }}
            </el-button>
        </div>
    </header>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    headers:{
        type:Object,
        required:true
    }
})

</script>

<style scoped>
.admin-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
}
.admin-header h3{
    font-weight: 700;
    font-size: 24px;
    line-height: 120%;
    color: #343740;
}

.add-btn__wrapper{
    display: flex;
    align-items: center;
}
.add-btn__wrapper .el-button{
    padding: 13px 19px;
    border: 1px solid #3D7BFE;
    border-radius: 5px;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
}
.add-product__btn{
    margin-left: 16px;
    background-color: #3D7BFE;
    color: #fff;
}

.add-btn__wrapper .el-button:hover{
    background-color: #3D7BFE;
    color: #fff;
}
</style>