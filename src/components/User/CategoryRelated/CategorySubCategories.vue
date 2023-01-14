<template>
    <li class="subcategories__item">
        <p @click="getSubCategoryProduct(subcategory._id)">{{ subcategory.name }}</p>
    </li>
</template>

<script setup>
import store from '@/store';
import { defineProps } from 'vue';
defineProps({
    subcategory:{
        type:Object,
        required:true
    }
})
const getSubCategoryProduct = (id) => {
    store.dispatch("category/getSubCategoryProduct", id)
}
</script>

<style scoped>
.subcategories__item{
    margin-bottom: 6px;
    padding: 4px 8px;
    border-radius: 6px;
}
.subcategories__item p{
    color: #212121;
    cursor: pointer;
    opacity: 0.9;
}
.subcategories__item:hover{
    background: #f4f5f5;
}
</style>