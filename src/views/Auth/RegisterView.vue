<template>
  <el-form
  :model="numberValidateForm"
  label-width="100px"
  class="demo-ruleForm login-form"
  >
  <el-form-item
  label="Name"
  prop="name"
  :rules="[
  { required: true, message: 'name is required' },
  ]"
  >
  <el-input
  v-model.number="numberValidateForm.name"
  type="text"
  autocomplete="off"
  />
</el-form-item>
<el-form-item
label="Username"
prop="username"
:rules="[
{ required: true, message: 'username is required' },
]"
>
<el-input
v-model.number="numberValidateForm.username"
type="text"
autocomplete="off"
/>
</el-form-item>
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
  <el-button type="primary" @click="register">Register</el-button>
  <el-button @click="toLogin">Login</el-button>
</el-form-item>
</el-form>
</template>

<script setup>
import router from '@/router'
import { useStore } from 'vuex'
import { reactive } from 'vue'
const store = useStore()
const numberValidateForm = reactive({
  name: '',
  password:'',
  username:'',
  email:'',
  isAdmin: true
})

const toLogin = () =>{
  router.push({ name: "Login" })
}

const register = () => {
  store.dispatch("auth/registerUser", numberValidateForm)
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