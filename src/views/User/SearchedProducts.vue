<template>
  <div>
    <div v-if="searchedProducts">
      <SingleProduct :product="product" v-for="(product, id) in searchedProducts" :key="id" />
    </div>
    <p v-else>
      salom
    </p>
  </div>
</template>

<script setup>
import SingleProduct from "../../components/User/SingleProduct.vue"
import { useStore } from "vuex";
import { onMounted, computed } from "@vue/runtime-core";
import router from "@/router";
const store = useStore()

onMounted(async () => {
  const route =  router.currentRoute.value.query
  await store.dispatch("product/searchProduct", route.name)
})

const searchedProducts = computed(() => {
  return store.state.product?.searchProduct
})
</script>

<style>

</style>