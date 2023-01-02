<template>
    <div>
        <TheAdminHeader :headers="header"/>
        <el-table :data="users" style="width: 100%">
            <el-table-column label="Name">
                <template #default="scope">
                    <div>{{ scope.row.name }}</div>
                </template>
            </el-table-column>
            <el-table-column label="Email">
                <template #default="scope">
                    <div>{{ scope.row.email ?? 'mavjud emas' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="Username">
                <template #default="scope">
                    <div>{{ scope.row.username }}</div>
                </template>
            </el-table-column>
            <el-table-column label="Kim">
                <template #default="scope">
                    <div>{{ scope.row.isAdmin === true ? 'admin' : 'oddiy' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="Operations" >
                <template #default="scope">
                    <el-button size="small" @click="userModal({name:'edit', val:scope.row})"
                    >Edit</el-button
                    >
                    <el-button
                    size="small"
                    type="danger"
                    @click="userModal({name:'delete', val:scope.row})"
                    >Delete</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import TheAdminHeader from '@/components/Admin/TheAdminHeader.vue';
import { computed, onMounted, ref } from 'vue';
import  { useStore } from 'vuex'
const store = useStore();
const header = ref({
    title:"Users",
    hasBtn:false,
    addMain:"Add User",
    goRoute:"addUser",
})
onMounted(() => {
    store.dispatch("auth/getAllUsers")
})
const users = computed(() => {
    return store.state.auth?.users
})
</script>

<style>

</style>