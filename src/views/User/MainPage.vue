<template>
  <div>
    <div class="main-products">
      <SingleProduct :product="product" v-for="(product, id) in products" :key="id" />
    </div>
  </div>
</template>

<script setup>
import SingleProduct from '@/components/User/SingleProduct.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
const store = useStore()
onMounted(() => {
  store.dispatch("product/getAllProduct")
})

const products = computed(() => {
  return store.state.product.products
})
</script>

<style>
.main-products{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
@media screen and (max-width:950px) {
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