<template>
  <div class="main-page">
    <TheCarousel/>
    <div class="main-products__wrapper">
      <h3>Ommabop</h3>
      <div class="main-products">
        <SingleProduct :product="product" v-for="(product, id) in bestseller" :key="id" />
      </div>
    </div>
    <p class="again-product">Просмотреть ещё</p>
    <img class="banner" src="https://images.uzum.uz/cehgelol08kcldtp1uhg/main_page_banner.jpg" alt="">
    <div> 
      <MainCategoryProducts :mainCategoryProducts="main" v-for="(main, id) in mainCategoryProducts" :key="id"/>
    </div>
  </div>
</template>

<script setup>
import SingleProduct from '@/components/User/SingleProduct.vue';
import TheCarousel from '@/components/TheCarousel.vue';
import MainCategoryProducts from '@/components/User/MainCategoryProducts.vue';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
const store = useStore()
onMounted(async () => {
  await store.dispatch("product/getMainBestSellers")
  await store.dispatch("category/getCategoryWithSubcategory")
  await store.dispatch("product/getMainCategoryProducts")
})

const bestseller = computed(() => {
  return store.state.product?.bestseller
})

const mainCategoryProducts = computed(() => {
  return store.state.product?.mainProducts
})

</script>

<style>
.main-page{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main-products__wrapper{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.main-products__wrapper h3{
  margin-bottom: 32px;
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