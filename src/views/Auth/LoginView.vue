<template>
  <el-form
  :model="numberValidateForm"
  label-width="100px"
  class="demo-ruleForm login-form"
  >
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
  v-model.number="numberValidateForm.email"
  type="text"
  autocomplete="off"
  />
</el-form-item>
<el-form-item
label="Password"
prop="password"
:rules="[
{ required: true, message: 'password is required' },
{ min:4, message: 'password must be at least 8' },
]"
>
<el-input
v-model="numberValidateForm.password"
type="text"
autocomplete="off"
/>
</el-form-item>
<el-form-item>
  <el-button @click="toRegister">Register</el-button>
  <el-button type="primary" @click="login">Login</el-button>
</el-form-item>
</el-form>
</template>

<script setup>
import router from '@/router'
import store from '@/store'
import { reactive } from 'vue'


const numberValidateForm = reactive({
  email: '',
  password:'',  
})

const toRegister = () =>{
  router.push({ name: "Register" })
}

const login = () => {
  store.dispatch("auth/login", numberValidateForm)
}
</script>


<style>
.login-form{
  width: 350px;
}
.login-form .el-form-item__content{
  margin-left: 0px !important;
}
.login-form{
  margin: 0 auto;
}
.login-form .el-form-item{
  flex-direction: column;
}
.login-form .el-form-item__label{
  justify-content: flex-start !important;
}

</style>