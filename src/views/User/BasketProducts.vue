<template>
  <div class="basket">
    <h2>Savatingiz <span>{{ '1 ta mahsulot' }}</span></h2>
    <div class="basket__wrapper">
        <SingleBasketProduct />
        <SingleBasketCard />
    </div>
  </div>
</template>

<script setup>
import SingleBasketCard from '@/components/User/SingleBasketCard.vue';
import SingleBasketProduct from '@/components/User/SingleBasketProduct.vue'
</script>

<style scoped>
.basket__wrapper{
    display: grid;
    grid-template-columns: 2fr 1fr;
}
</style>