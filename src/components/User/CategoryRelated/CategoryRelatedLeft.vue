<template>
  <div class="category-subcategories">
    <h3>Turkumlar</h3>
    
    <ul class="subcategories__wrapper">
      <router-link to="/" class="subcategories__wrapper-title">{{ realCurrentCategory?.name }}</router-link>
      <CategorySubCategories  :subcategory="subcategory" v-for="(subcategory, id) in subcategories" :key="id"/>
    </ul>
  </div>
</template>

<script setup>
import store from '@/store';
import { computed } from '@vue/runtime-core';
import CategorySubCategories from './CategorySubCategories.vue';

const realCurrentCategory = computed(() => {
  return store.state.category?.realCurrentCategory
})
const subcategories = computed(() => {
  return store.state.category?.relatedSubcategories
})
</script>

<style scoped>
.category-subcategories{
  width: 320px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.subcategories__wrapper{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 16px;
}
.subcategories__wrapper-title{
  padding: 4px 8px;
  margin-bottom: 6px;
  color: #212121;
  opacity: 0.9;
}
.subcategories__wrapper-title:hover{
  background: #f4f5f5;
}
</style>