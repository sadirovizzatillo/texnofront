<template>
    <div class="add-brand">
        <h2>Add Brand</h2>
        <div class="add-brand__wrapper">
            <div class="add-brand__input">
                <el-form-item
                label="Brand"
                prop="brand"
                :rules="[
                { required: true, message: 'brand is required' },
                ]"
                >
                <el-input 
                v-model="brand" 
                placeholder="Brand..."
                ></el-input>
            </el-form-item>        
        </div>
        <!-- <div>
            <label for="category">Category</label>
            <el-select v-model="category" name="category" id="category">
                <el-option value="computer">Комьютерная техника</el-option>
                <el-option value="phone">alik</el-option>
                <el-option value="dress">salom</el-option>
            </el-select>
        </div> -->
    </div>
    <div class="add-brand__btns">
        <el-button class="add-brand__add-btn" @click="addBrand">Qo'shish</el-button>
        <el-button @click="(() => $router.go(-1))">Bekor Qilish</el-button>
    </div>
</div>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import { ref } from "@vue/reactivity";
const brand = ref()
const addBrand = () => {
    store.dispatch("brand/addBrand", brand.value);
    router.go(-1)
}
// const category = ref()
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