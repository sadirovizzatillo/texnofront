<template>
  <InnerProduct />
  <div class="advice-products" v-if="adviceProducts.length">
    <AdviceProducts :adviceproducts="product"  v-for="(product, id) in adviceProducts" :key="id"/>
  </div>
</template>

<script setup>
import AdviceProducts from '@/components/User/AdviceProducts.vue';
import InnerProduct from '@/components/User/InnerProduct.vue';
import router from '@/router';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from "vuex"
const store = useStore()
onMounted(() => {
  const routeId = router.currentRoute.value.params.id
  store.dispatch("product/getSingleProduct", routeId)
  store.dispatch("product/getAdviceProducts", routeId)
})

const adviceProducts = computed(() => {
  return store.state.product?.adviceProducts
})
</script>

<style scoped>
.advice-products{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
}
</style>