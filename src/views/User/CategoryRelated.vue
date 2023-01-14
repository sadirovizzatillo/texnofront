<template>
  <div>
    <header class="category-related__header">
      <h2>{{ currentCategory?.name }}</h2>
      <div>
        <span>Saralash</span>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          />
        </el-select>
      </div>
    </header>
    <el-divider/>
    <div class="category-related__main">
      <CategoryRelatedLeft/>
      <CategoryRelatedProducts/>
    </div>
  </div>
</template>

<script setup>
import CategoryRelatedLeft from "@/components/User/CategoryRelated/CategoryRelatedLeft.vue";
import CategoryRelatedProducts from "@/components/User/CategoryRelated/CategoryRelatedProducts.vue"
import router from "@/router";
import  { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
const store = useStore()
const value = ref('')

onMounted(() => {
  const route = router.currentRoute.value.params.id
  store.dispatch("category/getSingleCategory", route)
  store.dispatch("category/getAllProduct", route)
})


const currentCategory = computed(() => {
  return store.state.category?.currentCategory
})

const options = [
{
  value: 'price',
  label: 'Arzonroq',
},
{
  value: 'simple',
  label: 'Ommabop',
},
{
  value: 'rating',
  label: 'Reytingi yuqori',
},
{
  value: 'order',
  label: 'Ko"p byurutirilgan',
},
{
  value: 'date',
  label: 'Yaqinda qo"shilgan',
}
]
</script>

<style scoped>
.category-related__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.category-related__main{
  display: flex;
  align-items: flex-start;
}
</style>