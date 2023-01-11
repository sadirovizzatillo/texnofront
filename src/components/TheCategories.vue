<template>
    <li class="category-item">
        <a class="category-title">{{ category.name }}</a>
    </li>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
    category:{
        type:Object,
        required:true
    }
})
</script>

<style>
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