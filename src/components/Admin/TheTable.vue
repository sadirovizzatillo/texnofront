<template>
    <el-table :data="allProducts" style="width: 100%">
        <el-table-column label="Title">
            <template #default="scope">
                <div>{{ scope.row.title }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Username">
            <template #default="scope">
                <div>{{ scope.row.title }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Price">
            <template #default="scope">
                <div>{{ scope.row.price }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Image">
            <template #default="scope">
                <img :src="'http://localhost:8000/' + scope.row.productImage" :alt="scope.row.title" width="40" height="40">
            </template>
        </el-table-column>
        <el-table-column label="Operations" >
            <template #default="scope">
                <el-button size="small" @click="userModal({name:'edit', val:scope.row})"
                >Edit</el-button
                >
                <el-button
                size="small"
                type="danger"
                @click="userModal({name:'delete', val:scope.row})"
                >Delete</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    allProducts:{
        type:Array
    }
})
</script>

<style>

</style>