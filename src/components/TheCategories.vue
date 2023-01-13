<template>
    <li class="category-item" @click="getCategoruProducts(category._id)">
        <router-link 
        :to="{name: 'CategoryRelated', params: { id: category._id }}" 
        class="category-title">{{ category.name }}</router-link>
    </li>
</template>

<script setup>
import store from '@/store';
import { defineProps } from 'vue';
defineProps({
    category:{
        type:Object,
        required:true
    }
})
const getCategoruProducts = async (route) => {
    await store.dispatch("category/getAllProduct", route)
    await store.dispatch("category/getSingleCategory", route)
}
</script>

<style>
a{
    text-decoration: none;
}
.category-title{
    color: rgba(0, 0, 0, 0.575) !important;
}
.category-item{
    width: 40px;
    display: flex;
    flex-direction: column;
    cursor:pointer;
    margin-right: 16px;
}

.category-item::after{
    content: "";
    width: 0%;
    height: 2px;
    opacity: 0;
    background: #000;
    margin-top: 4px;
    transition: all 0.5s ease;
}

.category-item:hover::after{
    opacity: 0.7;
    width: 100%;
    height: 2px;
}

</style>