<template>
  <h2 style="text-align: left; margin-bottom: 32px;">Add User</h2>
  <div class="admin-user__add">
    <div>
      <label for="product">User name</label>
      <el-input v-model="form.name" placeholder="User name..."></el-input>
    </div>
    <div>
      <label for="product">User username</label>
      <el-input v-model="form.username" placeholder="User username..."></el-input>
    </div>
    <div>
      <label for="product">User password</label>
      <el-input v-model="form.password" placeholder="User password..."></el-input>
    </div>
    <div>
      <label for="product">User email</label>
      <el-input v-model="form.email" placeholder="User email..."></el-input>
    </div>
    <div>
      <label for="product">User level</label>
      <el-select v-model="form.isAdmin">
        <el-option value="true">Admin</el-option>
        <el-option value="false">Oddiy</el-option>
      </el-select>
    </div>
  </div>
  <div class="add-brand__btns">
    <el-button class="add-brand__add-btn" @click="addUser">Qo'shish</el-button>
    <el-button>Bekor Qilish</el-button>
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

<style scoped>
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
.el-select{
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