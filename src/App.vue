<template>
  <component :is="layout">
    <router-view :layout="layout"/>
  </component>
</template>


<script>
import AuthLayout from './Layouts/AuthLayout.vue';
import AdminLayout from './Layouts/AdminLayout.vue';
import UserLayout from './Layouts/UserLayout.vue';
import router from './router';
export default {
  name:"App",
  data(){
    return{
      route:this.$route
    }
  },
  computed:{
    layout(){
      var result = null
      if(router.currentRoute.value.meta.layout === "AuthLayout"){
        result =  AuthLayout
      }
      if(router.currentRoute.value.meta.layout === "AdminLayout"){
        result =  AdminLayout
      } 
      if(router.currentRoute.value.meta.layout === "UserLayout"){
        result =  UserLayout
      }
      
      return result
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

p, h1,h2,h3,h4{
  margin: 0;
}
.el-pagination{
  margin-top: 32px;
}
</style>
