<template>
  <h2 style="text-align: left; margin-bottom: 32px;">Add User</h2>
  <el-form 
  :model="form"
  class="admin-user__add demo-ruleForm login-form">
  <div>
    <el-form-item
    label="Username"
    prop="name"
    :rules="[
    { required: true, message: 'name is required' },
    { min:6, message: 'name must be at least 6' },
    ]"
    >
    <el-input 
    v-model="form.name" 
    placeholder="User name..."
    ></el-input>
  </el-form-item>
</div>
<div>
  <el-form-item
  label="Username"
  prop="username"
  :rules="[
  { required: true, message: 'username is required' },
  { min:6, message: 'username must be at least 6' },
  ]"
  >
  <el-input 
  v-model="form.username" 
  placeholder="User username..."
  ></el-input>
</el-form-item>
</div>
<div>
  <el-form-item
  label="Password"
  prop="password"
  :rules="[
  { required: true, message: 'password is required' },
  { min:4, message: 'password must be at least 8' },
  ]"
  >
  <el-input 
  v-model="form.password" 
  placeholder="User password..."
  ></el-input>
</el-form-item>
</div>
<div>
  <el-form-item
  label="Email"
  prop="email"
  :rules="[
  {
    required: true,
    message: 'Please input email address',
    trigger: 'blur',
  },
  {
    type: 'email',
    message: 'Please input correct email address',
    trigger: ['blur', 'change'],
  },
  ]"
  >
  <el-input 
  v-model="form.email" 
  placeholder="User email..."
  />
</el-form-item>
</div>
<div>
  <label for="product">User level</label>
  <el-select v-model="form.isAdmin">
    <el-option value="true">Admin</el-option>
    <el-option value="false">Oddiy</el-option>
  </el-select>
</div>
</el-form>
<div class="add-brand__btns">
  <el-button class="add-brand__add-btn" @click="addUser">Qo'shish</el-button>
  <el-button @click="(() => $router.go(-1))">Bekor Qilish</el-button>
</div>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import { reactive } from "@vue/reactivity";

const form = reactive({
  name:"",
  username:"",
  email:"",
  password:"",
  isAdmin:false
})

const addUser = () => {
  store.dispatch("auth/addUser", form)
  router.go(-1)
}
</script>

<style>
.admin-user__add .el-form-item{
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.admin-user__add .el-form-item .el-form-item__content{
  width: 100% !important;
}
.admin-user__add .el-form-item .el-input{
  width: 100% !important;
}

.admin-user__add{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 42px;
}
.admin-user__add div label{
  display: flex;
  margin-bottom: 8px;
}
.admin-user__add .el-select{
  width: 50%;
  align-self: flex-start;
  align-items: flex-start;
  display: flex;
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