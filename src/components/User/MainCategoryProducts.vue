<template>
    <div class="main-category__products">
        <h3 v-if="mainCategoryProducts.products.length">
            {{ mainCategoryProducts?.name }}
        </h3>
        <div class="main-products">
            <SingleProduct :product="product" v-for="(product, id) in mainCategoryProducts.products" :key="id" />
        </div>
    </div>
</template>

<script setup>
import SingleProduct from '../User/SingleProduct.vue';
import { defineProps } from 'vue';
defineProps({
    mainCategoryProducts:{
        type:Object,
        required:true
    },
    title:{
        type:String
    }
})
</script>

<style scoped>
.main-category__products{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 32px;
}
.main-category__products h3{
    margin-bottom: 32px;
}
.main-products{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
    margin-bottom: 32px;
    flex-grow: 1;
}
</style>