<template>
    <div class="basket-card">
        <h3 class="basket-card__title">Buyurtmangiz</h3>
        <div class="basket-card__wrapper">
            <div class="basket-card__products">
                <h4>Mahsulotlar {{ purchased.length }}</h4>
                <p>{{ priceSpacer(allSum) }} so'm</p>
            </div>
            <div class="basket-card__sum">
                <h4>Jami</h4>
                <p>{{ priceSpacer(allSum) }} so'm</p>
            </div>
            <el-button class="basket-card__btn" type="primary" @click="buyProducts">Sotib Olish</el-button>
        </div>
    </div>
</template>

<script setup>
import priceSpacer from '../../helpers/price.spaces';
import store from "@/store"
import { computed } from "@vue/runtime-core"

const buyProducts = async () => {
    const user = await JSON.parse(localStorage.getItem("users"));
    if(user){
        store.dispatch("basket/buyProducts")
    }else{
        store.dispatch("toast/warning", {
            title: "Ogohlantirish",
            message: "Siz ro'yxatdan o'tmagansiz!"
        })
    }
}

const allSum = computed(() => {
    const result = store.state.basket?.purchasing.reduce((total, value) => total += value.totalPrice, 0)
    return result
})
const purchased = computed(() => {
    return store.state.basket?.purchasing
})
</script>

<style scoped>
.basket-card{
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(228, 222, 222);
    padding: 20px;
    align-items: flex-start;
    border-radius: 12px;
    justify-content: space-between;
}
.basket-card__title{
    margin-bottom: 24px;
}
.basket-card__wrapper{
    width: 100%;
}
.basket-card__products{
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}
.basket-card__sum{
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}
.basket-card__btn{
    width: 100%;
    background-color: rgb(112, 0, 255);
    color: #fff;
    padding: 18px 0;
    border-radius: 12px;
}
.basket-card__btn:hover{
    opacity: 0.8;
}
</style>