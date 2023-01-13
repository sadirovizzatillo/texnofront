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
        label="SubCategory"
        prop="name"
        :rules="[
        { required: true, message: 'subcategory is required' },
        ]"
        >
        <el-input 
        v-model="form.name" 
        placeholder="category..."
        ></el-input>
    </el-form-item>    
    <el-form-item label="Category">
        <el-select
        v-model="form.parentCategoryId"
        name="category"
        id="category"
        placeholder="Category"
        >
        <el-option
        v-for="item in categories"
        :key="item._id"
        :label="item.name"
        :value="item._id"
        />
    </el-select>
</el-form-item>    
</el-form>
</div>
<div class="add-category__btns">
    <el-button class="add-category__add-btn" @click="addsubcategory">Qo'shish</el-button>
    <el-button @click="(() => $router.go(-1))">Bekor Qilish</el-button>
</div>
</div>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
const form = reactive({
    parentCategoryId:"",
    name:""
})
const categories = computed(() => {
	return store.state.category?.categories;
});
const addsubcategory = () => {
    store.dispatch("category/addSubCategory", form);
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