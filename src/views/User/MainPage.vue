<template>
  <div class="main-page">
    <TheCarousel/>
    <div class="main-products">
      <SingleProduct :product="product" v-for="(product, id) in products" :key="id" />
    </div>
    <img class="banner" src="https://images.uzum.uz/cehgelol08kcldtp1uhg/main_page_banner.jpg" alt="">
  </div>
</template>

<script setup>
import SingleProduct from '@/components/User/SingleProduct.vue';
import TheCarousel from '@/components/TheCarousel.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
const store = useStore()
onMounted(async () => {
  await store.dispatch("product/getAllProduct")
  await store.dispatch("category/getCategoryWithSubcategory")
})

const products = computed(() => {
  return store.state.product?.products
})

</script>

<style>
.main-page{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main-products{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
  flex-grow: 1;
}
.banner{
  object-fit: cover;
  max-width: 1200px;
  border-radius: 12px;
  margin-top: 32px;
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