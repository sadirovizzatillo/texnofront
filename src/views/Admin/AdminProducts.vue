<template>
  <div>
    <TheAdminHeader :headers="header"/>
    <el-input
    v-model="searchProducts"
    class="w-50 m-2 admin-product__input"
    placeholder="Please Input"
    :suffix-icon="Search"
    @input="filterProduct($event)"
    />
    <TheTable :all-products="products" :brands="brands" :categories="categories"/>
    <el-pagination
    v-if="total > 10"
    background
    layout="prev, pager, next"
    :total="total"
    @current-change="handleCurrentChange"
    >
  </el-pagination>
</div>
</template>

<script setup>
import TheAdminHeader from '@/components/Admin/TheAdminHeader.vue';
import { Search } from '@element-plus/icons-vue'
import TheTable from '@/components/Admin/TheTable.vue';
import { useStore } from 'vuex';
import { ref } from '@vue/reactivity';
import { computed, onMounted } from '@vue/runtime-core';
const searchProducts = ref('')
const store = useStore()
const header = ref({
  title:"Products",
  hasBtn:false,
  hasAddition:false,
  addMain:"Add Product",
  goRoute:"addProduct",
})

onMounted(async () => {
  await store.dispatch("product/getAllAdminProduct")
  await store.dispatch("brand/getBrands")
  await store.dispatch("category/getCategories")
  await store.dispatch("category/getSubCategories")
})

const brands = computed(() => {
  return store.state.brand?.brands
})
const categories = computed(() => {
  return store.state.category?.categories
})


const handleCurrentChange = (val) => {
  store.dispatch("product/productsPaginate", val)
}
const filterProduct = async (e) => { 
  if(e === ''){
    await store.dispatch("product/getAllAdminProduct")
  }else{
    store.dispatch("product/filterProduct", e)
  }
}
const products = computed(() => {
  return store.state.product?.adminProducts
})
const total = computed(() => {
  return Math.ceil(store.state.product?.total / 7) * 10
})
</script>

<style scoped>
.admin-product__input{
  margin-bottom: 24px;
}
</style>