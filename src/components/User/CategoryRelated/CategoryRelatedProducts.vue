<template>
    <div class="category-related__products" v-if="products?.length">
        <SingleProduct :product="product" v-for="(product, id) in products" :key="id" />
    </div>
    <div class="basket" v-else>
        <el-empty description="Bizda hozircha bunday mahsulot yoʻq">
            <el-button type="primary" @click="(() => $router.push('/'))">Bosh sahifa</el-button>
        </el-empty>
    </div>
</template>

<script setup>
import store from '@/store';
import { computed } from '@vue/runtime-core';
import SingleProduct from '../SingleProduct.vue';

const products = computed(() => {
    return store.state.category?.relatedCategoryProducts
})
</script>

<style scoped>
.category-related__products{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 12px;
}
</style>