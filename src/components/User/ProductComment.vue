<template>
    <div class="product-comment">
        <div class="product-comment__header">
            <div class="product-comment__header-wrapper">
                <h3>{{ review.review?.user_id?.name }}</h3>
                <p>{{ review.review?.user_id?.email }}</p>
            </div>
            <span v-if="review.review?.date">
                {{ new Date(review.review?.date).getFullYear() }} -
                {{ new Date(review.review?.date).getMonth() }} -
                {{ new Date(review.review?.date).getDate() }} 
            </span>
            <span v-else>
                {{ new Date().getHours() }} : {{ new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() :  new Date().getMinutes() }}
            </span>
        </div>
        <p class="product-comment__text">{{ review.review.text }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const review = defineProps(["review"])
</script>

<style>
.product-comment{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 32px;
    max-width: 560px;
}
.product-comment__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 560px;
    margin-bottom: 32px;
}
.product-comment__header h3{
    color: #707373;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-transform: capitalize;
    margin-right: 16px;
}
.product-comment__header-wrapper{
    display: flex;
}
.product-comment__header p{
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #707373;
}
.product-comment__header span{
    color: #AFB3B3;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
}
.product-comment__text{
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #707373;
    text-align: left;
}
</style>