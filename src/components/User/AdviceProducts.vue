<template>
    <SingleProduct :product="adviceproducts"/>
</template>

<script setup>
import SingleProduct from "@/components/User/SingleProduct.vue"
import { defineProps } from "vue"

defineProps({
    adviceproducts:{
        type:Object,
        required:true
    }
})
</script>

<style>

</style>