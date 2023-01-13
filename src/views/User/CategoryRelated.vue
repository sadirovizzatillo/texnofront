<template>
  <div>
    {{ subcategories }}

    {{ categoryProducts }}
  </div>
</template>

<script setup>
import router from "@/router";
import  { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
const store = useStore()
onMounted(() => {
    const route = router.currentRoute.value.params.id
    store.dispatch("category/getSingleCategory", route)
    store.dispatch("category/getAllProduct", route)
})

const subcategories = computed(() => {
    return store.state.category?.subcategories
})
const categoryProducts = computed(() => {
    return store.state.category?.relatedCategoryProducts
})
</script>

<style>

</style>