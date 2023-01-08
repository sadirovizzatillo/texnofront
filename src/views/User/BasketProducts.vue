<template>
  <div class="basket" v-if="basketProducts.length">
    <h2 class="basket-title">Savatingiz <span>{{ '1 ta mahsulot' }}</span></h2>
    <div class="basket__wrapper" >
      <div class="basket-products">
        <SingleBasketProduct :basketProduct="product" v-for="(product, id) in basketProducts" :key="id"/>
      </div>
      <SingleBasketCard />
    </div>
  </div>
  <div class="basket" v-else>
    <el-empty description="Savatda hozircha mahsulot yoʻq">
      <el-button type="primary">Bosh sahifa</el-button>
    </el-empty>
  </div>
</template>

<script setup>
import SingleBasketCard from '@/components/User/SingleBasketCard.vue';
import SingleBasketProduct from '@/components/User/SingleBasketProduct.vue'
import { useStore} from 'vuex';
import { computed } from '@vue/runtime-core';
const store = useStore()

const basketProducts = computed(() => {
  return store.state.basket?.basket
})
</script>

<style scoped>
.basket{
  width: 100%;
}
.basket__wrapper{
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  align-items: flex-start;
}
.basket-products{
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  border: 1px solid rgb(228, 222, 222);
  padding: 20px;
}
.basket-title{
  display: flex;
  align-items: flex-start;
  margin-bottom: 32px;
}
.basket-title span{
  margin-left: 8px;
  color: gray;
}
</style>