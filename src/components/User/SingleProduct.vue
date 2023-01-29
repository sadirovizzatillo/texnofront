<template>
    <div @click="getAdviceProducts(product)">
        <router-link class="single-product" :to="{ name:'InnerProduct', params: { id: product._id }}">
            <el-skeleton style="width: 240px" :loading="isLoading" animated>
                <template #template>
                    <el-skeleton-item variant="image" style="width: 220px; height: 220px" />
                    <div style="padding: 14px">
                        <el-skeleton-item variant="h3" style="width: 100%; margin-bottom: 16px;" />
                        <el-skeleton-item variant="p" style="width: 30%; display: flex;
                        align-items: flex-start;" />
                        <div
                        style="
                        display: flex;
                        align-items: center;
                        justify-items: space-between;
                        margin-top: 16px;
                        height: 16px;
                        "
                        >
                        <el-skeleton-item variant="text" style="margin-right: 16px" />
                        <el-skeleton-item variant="text" style="width: 30%" />
                    </div>
                </div>
            </template>
            <template #default>
                <div>
                    <img  :src="product.productImage.url ?? require('../../assets/naushnik.jpg')" :alt="product.title" width="220" height="220">
                </div>
                <h2 class="single-product__title">{{ product.title  }}</h2>
                <el-rate
                v-model="value"
                disabled
                show-score
                max="1"
                text-color="#ff9900"
                score-template="{value} points"
                />
                <div class="product-features">
                    <p>{{ priceSpacer(product.price) }} so'm</p>
                    <svg data-v-56571d0e="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ui-icon  add-cart-icon">
                        <path d="M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z" fill="black"></path>
                        <path d="M7.5 14C7.77614 14 8 14.2239 8 14.5V17H10.5C10.7761 17 11 17.2239 11 17.5C11 17.7761 10.7761 18 10.5 18H8V20.5C8 20.7761 7.77614 21 7.5 21C7.22386 21 7 20.7761 7 20.5V18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H7V14.5C7 14.2239 7.22386 14 7.5 14Z" fill="black"></path>
                    </svg>
                </div>
            </template>
        </el-skeleton>    
    </router-link>
</div>
</template>

<script setup>
import priceSpacer from '@/helpers/price.spaces';
import store from '@/store';
import {  computed, defineProps, ref } from 'vue';
defineProps(["product"])
const value = ref(3.7)

const isLoading = computed(() => {
    return store.state.product?.isProductLoading
})
const getAdviceProducts = async (product) => {
    if(product){
        await localStorage.setItem("adviceProductCategory", product?._id)
        await store.dispatch("product/getAdviceProducts", product?._id)
    }else{
        return
    }
}
// const truncate = (value, lengths) => {
//     if (value.length > lengths) {
//         return value.substring(0, lengths) + "...";
//     } else {
//         return value;
//     }
// }


</script>

<style scoped>
.single-product__title{
    font-weight: bold;
    font-size: 18px;
    line-height: 1;
}
.single-product{
    display: flex;
    flex-direction: column;
    max-width: 220px;
    text-decoration: none !important;
    color: #000;
}
.single-product img{
    border-radius: 12px;
    transition: all .25s;
    will-change: transform;
    margin-bottom: 12px;
}
.single-product h3, h2{
    margin-top: 0;
    margin-bottom: 8px;
    text-align: left;
}
.product-features{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.single-product__desc{
    font-size: 16px;
}


</style>