<template>
  <InnerProduct />
</template>

<script setup>
import InnerProduct from '@/components/User/InnerProduct.vue';
import router from '@/router';
import { onMounted } from '@vue/runtime-core';
import { useStore } from "vuex"
const store = useStore()
onMounted(() => {
  const routeId = router.currentRoute.value.params.id
  store.dispatch("product/getSingleProduct", routeId)
})
</script>

<style>

</style>