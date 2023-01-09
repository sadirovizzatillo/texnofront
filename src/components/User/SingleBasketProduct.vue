<template>
    <div class="basket-product">
        <img :src="require('@/assets/naushnik.jpg')" class="basket-product__image" alt="" width="100" height="120" />
        <div class="basket-product__wrapper">
            <div class="about-seller">
                <h4 class="about-seller__title">{{ basketProduct.title }}</h4>
                <div class="about-seller__wrapper">
                    <h4>Sotuvchi</h4>
                    <p>HOME MARKET</p>
                </div>
            </div>
            <div class="basket-single__quantity">
                <el-input-number :model-value="basketProduct.quantity" v-model="num" :min="1" :max="basketProduct.realQuantity" @change="handleQuantityChange(basketProduct)"></el-input-number>
                <span>{{ priceSpacer(basketProduct?.realPrice) }} so'm/birlik</span>
            </div>
            <div class="basket-single__sum">
                <el-button type="warning" @click="removeBasketProduct(basketProduct)">Yo'q qilish</el-button>
                <div class="basket-single__sum-wrapper">
                    <h4>{{ priceSpacer(basketProduct?.totalPrice) }} so'm</h4>
                    <p>0</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import priceSpacer from '../../helpers/price.spaces';
import store from "@/store";
import { ref }  from "@vue/reactivity";
import { defineProps } from "vue";
defineProps({
    basketProduct:{
        type:Object,
        required:true
    }
})
const num = ref(1)
const removeBasketProduct = (product) => {
    store.dispatch("basket/removeBasketProduct", product)
}
const handleQuantityChange = (product) => {
    console.log(num.value, product)
    store.dispatch("basket/countTotal", { count: num.value, product:product })
}

</script>

<style scoped>
.basket-product{
    display: flex;
    align-items: flex-start;
    border: 1px solid rgb(228, 222, 222);
    padding: 20px;
    border-radius: 12px;
}
.basket-product:not(:first-child){
    border-top: 1px solid rgb(228, 222, 222);
}
.basket-product__image{
    margin-right: 24px;
}
.basket-product__wrapper{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.basket-product__wrapper:first-child{
    border-top: 1px solid rgb(228, 222, 222) !important;
}
.about-seller{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}
.about-seller__title{
    margin-bottom: 24px;
}
.basket-single__quantity{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.basket-single__sum{
    display: flex;
    flex-direction: column;
}
.basket-single__sum .el-button{
    margin-bottom: 24px;
}
.basket-single__sum h4{
    font-weight: bold;
    font-size: 24px;
}
.basket-single__sum-wrapper{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.about-seller__wrapper{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>