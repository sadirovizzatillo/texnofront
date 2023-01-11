<template>
  <div>
    <div class="categories-wrapper">
      <TheCategories :category="category" v-for="(category, id) in categories" :key="id"/>
    </div>
    <TheCarousel/>
    <div class="main-products">
      <SingleProduct :product="product" v-for="(product, id) in products" :key="id" />
    </div>
  </div>
</template>

<script setup>
import TheCategories from '@/components/TheCategories.vue';
import SingleProduct from '@/components/User/SingleProduct.vue';
import TheCarousel from '@/components/TheCarousel.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
const store = useStore()
onMounted(() => {
  store.dispatch("product/getAllProduct")
  store.dispatch("category/getCategories")
})

const products = computed(() => {
  return store.state.product?.products
})
const categories = computed(() => {
  return store.state.category?.categories
})
</script>

<style>
.main-products{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
}

.categories-wrapper{
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
}
@media screen and (max-width:1150px) {
  .main-products{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media screen and (max-width:970px) {
  .main-products{
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (max-width:720px) {
  .main-products{
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (max-width:500px) {
  .main-products{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>