<template>
    <div class="carusel block text-center" m="t-4">
        <el-carousel trigger="click" height="400px">
            <el-carousel-item v-for="(item, id) in images" :key="id">
                <img  height="400" style="object-fit: cover; width: 100%; border-radius: 12px;" :src="require('@/assets/uzum.jpg')"/>
            </el-carousel-item>
        </el-carousel>

    </div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";

const images = reactive([
{
    id:1,
    url:"https://images.uzum.uz/ceqmcsivtie1lhbg8utg/main_page_banner.jpg",
},
{
    id:2,
    url:"https://images.uzum.uz/cehgh6avtie1lhbf9vf0/main_page_banner.jpg",
},
{
    id:3,
    url:"https://images.uzum.uz/ceo2qtgv1htd23ak692g/main_page_banner.jpg",
},
{
    id:4,
    url:"https://images.uzum.uz/ceqmcsivtie1lhbg8utg/main_page_banner.jpg",
}
])
</script>
<style scoped>
.el-carousel__container{
    height: 350px !important;
}
.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}
.carusel{
    margin-bottom: 32px;
}
.el-image{
    border-radius: 12px;
    object-fit: contain !important;
}
/* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
} */
</style>
