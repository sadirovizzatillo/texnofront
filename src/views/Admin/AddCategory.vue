<template>
    <div class="add-category">
        <h2>Add category</h2>
        <div 
        class="add-category__wrapper " 
        >
        <el-form 
        class="add-category__input demo-ruleForm login-form"
        :model="form"
        >
        <el-form-item
        label="Category"
        prop="category"
        :rules="[
        { required: true, message: 'category is required' },
        ]"
        >
        <el-input 
        v-model="form.category" 
        placeholder="category..."
        ></el-input>
    </el-form-item>        
</el-form>
<!-- <div>
    <label for="category">Category</label>
    <el-select v-model="category" name="category" id="category">
        <el-option value="computer">Комьютерная техника</el-option>
        <el-option value="phone">alik</el-option>
        <el-option value="dress">salom</el-option>
    </el-select>
</div> -->
</div>
<div class="add-category__btns">
    <el-button class="add-category__add-btn" @click="addcategory">Qo'shish</el-button>
    <el-button @click="(() => $router.go(-1))">Bekor Qilish</el-button>
</div>
</div>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import { reactive } from "@vue/reactivity";
const form = reactive({
    category:""
})
const addcategory = () => {
    store.dispatch("category/addCategory", form.category);
    router.go(-1)
}
</script>

<style scoped>
.add-category h2{
    margin-bottom: 20px;
    text-align: left;
}
.add-category__wrapper{
    display: flex;
    align-items: center;
    max-width: 600px;
}
.add-category__input{
    margin-right: 24px;
}
.add-category__wrapper div{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
}
.add-category__wrapper div label{
    margin-bottom: 8px;
}
.add-category__btns{
    display: flex;
    align-items: center;
}
.add-category__add-btn{
    width: 250px;
    background-color: #3D7BFE;
    color: #fff;
    border: 2px solid #3D7BFE;
}
.add-category__add-btn:hover{
    background-color: inherit;
    color: #3D7BFE;
}
</style>