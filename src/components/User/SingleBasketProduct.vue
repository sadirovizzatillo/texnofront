<template>
    <div class="basket-product">
        <img :src="require('@/assets/naushnik.jpg')" alt="" width="100" height="120" />
        <div class="basket-product__wrapper">
            <div class="about-seller">
                <h4 class="about-seller__title">Cho'ziluvchan mayka</h4>
                <div>
                    <h4>Sotuvchi</h4>
                    <p>HOME MARKET</p>
                </div>
            </div>
            <div class="basket-single__quantity">
                <el-input-number v-model="num" :min="1" :max="10" @change="handleChange"></el-input-number>
                <span>{{ '29000 som/birlik' }}</span>
            </div>
            <div class="basket-single__sum">
                <el-button>Yo'q qilish</el-button>
                <div>
                    <h4>58000</h4>
                    <p>90 000</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref }  from "@vue/reactivity";

const num = ref(1)
</script>

<style scoped>
.basket-product{
    display: flex;
    align-items: flex-start;
}
.basket-product__wrapper{
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.about-seller{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
</style>