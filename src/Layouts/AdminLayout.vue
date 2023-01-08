<template>
    <div class="common-layout">
        <el-container>
            <el-header class="user-header">
                <div class="user-header__wrapper">
                    <h3>Uzum.uz</h3>
                    <div class="header-right">
                        <p>{{ userData?.username }}</p>
                        <el-button type="primary" @click="logout">Logout</el-button>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside class="user-aside" width="200px">
                    <el-row class="tac">
                        <el-col>
                            <el-menu
                            active-text-color="#ffd04b"
                            background-color="#545c64"
                            class="el-menu-vertical-demo"
                            text-color="#fff"
                            >
                            <el-menu-item index="1" @click="(() => $router.push('/admin/products'))">
                                <span>Products</span>
                            </el-menu-item>
                            <el-sub-menu index="2">
                                <template #title>
                                    <span>Users</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1" @click="(() => $router.push('/admin/users'))">All Users</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                            <el-menu-item index="4">
                                <span>Navigator Four</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main class="admin-main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>


<script>
import store from '@/store'
import router from '@/router'
// import router from '@/router'
export default{
    name:"AuthLayout",
    data(){
        return{
            user:null
        }
    },
    computed:{
        userData(){
            return store.state.register?.user ?? JSON.parse(localStorage.getItem("users")) 
        },
        types(){
            return store.state.questions?.types
        }
    },
    methods:{
        logout(){
            store.dispatch("auth/logout")
            router.push("/")
        },
        goQuestion(data){
            store.dispatch("questions/getSingleQuestions", data._id)
            this.$router.push({ name: "QuestionsView", params: { id: data._id }}) 
        },
        getAllUser(){
            this.$router.push({ name: "AllUsers" })
            store.dispatch("users/getAllUsers")
        }
    }
}
</script>



<style >
.user-header{
    background-color: #545c64;
    padding: 14px !important;
}
.el-menu-item-group__title{
    display: none !important;
}
.header-right{
    display: flex;
    align-items: center;
}
.header-right p{
    margin-right: 12px;
}
.admin-main{
    padding: 30px !important;
    margin-left: 220px;
}
.el-menu{
    border-right: none;
}
.user-aside{
    background-color: #545c64;
    color: #fff;
    position: absolute;
    width: 230px;
    height: 100%;
    z-index: 999;
}
.user-header__wrapper{
    display: flex;
    justify-content: space-between;
    color: #fff;
}
</style>