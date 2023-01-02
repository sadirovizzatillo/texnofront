<template>
  <div class="add-brand">
    <h2>Добавить подкатегорию</h2>
    <div class="add-brand__wrapper">
        <div class="add-brand__input">
            <label for="brand">Brand</label>
            <el-input id="brand" name="rband" v-model="brand" placeholder="Введите название"></el-input>
        </div>
        <div>
            <label for="category">Category</label>
            <el-select v-model="category" name="category" id="category">
                <el-option value="computer">Комьютерная техника</el-option>
                <el-option value="phone">alik</el-option>
                <el-option value="dress">salom</el-option>
            </el-select>
        </div>
    </div>
    <div class="add-brand__btns">
        <el-button class="add-brand__add-btn">Qo'shish</el-button>
        <el-button>Bekor Qilish</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const category = ref()
const brand = ref()
</script>

<style scoped>
    .add-brand h2{
        margin-bottom: 20px;
        text-align: left;
    }
    .add-brand__wrapper{
        display: flex;
        align-items: center;
        max-width: 600px;
    }
    .add-brand__input{
        margin-right: 24px;
    }
    .add-brand__wrapper div{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 12px;
    }
    .add-brand__wrapper div label{
        margin-bottom: 8px;
    }
    .add-brand__btns{
        display: flex;
        align-items: center;
    }
    .add-brand__add-btn{
        width: 250px;
        background-color: #3D7BFE;
        color: #fff;
        border: 2px solid #3D7BFE;
    }
    .add-brand__add-btn:hover{
        background-color: inherit;
        color: #3D7BFE;
    }
</style>