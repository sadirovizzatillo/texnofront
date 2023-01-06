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
        
        <el-dialog
        v-model="editModal"
        title="Edit User"
        width="40%"
        >
        <span v-if="isEdit">
            <el-form>
                <el-form-item label="Edit Title">
                    <el-input type="text" placeholder="Name" v-model="editName"></el-input>
                </el-form-item>
                <el-form-item label="Edit Username">
                    <el-input type="text" placeholder="Options" v-model="editUsername"></el-input>
                </el-form-item>
                <el-form-item label="Edit Email">
                    <el-input type="text" placeholder="Email" v-model="editEmail"></el-input>
                </el-form-item>
                <el-form-item label="Edit Password">
                    <el-input type="text" placeholder="Email" v-model="editPassword"></el-input>
                </el-form-item>
                <el-form-item label="Edit Level">
                    <el-select v-model="adminValue" placeholder="Select">
                        <el-option
                        v-for="item in adminOptions"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            
        </span>
        <span v-if="isDelete">Do you really want to delete this user?</span>
        <template #footer>
            <span class="dialog-footer" v-if="isEdit">
                <el-button @click="userModal">Cancel</el-button>
                <el-button type="primary" @click="editUser">
                    Edit
                </el-button>
            </span>
            
            <span class="dialog-footer" v-if="isDelete">
                <el-button @click="userModal">Cancel</el-button>
                <el-button type="primary" @click="deleteUser">
                    Delete
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    @current-change="handleCurrentChange"
    >
</el-pagination>
</div>
</template>

<script setup>
import TheAdminHeader from '@/components/Admin/TheAdminHeader.vue';
import { computed, onMounted, ref, reactive } from 'vue';
import  { useStore } from 'vuex'
const isEdit = ref(false)
const editModal = ref(false)
const editUsername = ref(null)
const adminValue = ref(Boolean)
const editName = ref(null)
const editEmail = ref("")
const isDelete = ref(false)
const editPassword = ref('')
const adminOptions = reactive([
    {
        name:"Admin",
        value:true
    },
    {
        name:"User",
        value:false
    },
])
const userId = ref(null)
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
const total = computed(() => {
    return store.state.auth?.total
})
const userModal = (data) => {
    editModal.value = !editModal.value
    if(data.name === 'edit'){
        isDelete.value = false
        isEdit.value = true
        editUsername.value = data.val?.username
        editName.value = data.val?.name
        adminValue.value = data.val?.isAdmin
        userId.value = data.val?._id
        editEmail.value = data.val?.email
        editPassword.value = data.val?.password
    }
    
    if(data.name === 'delete'){
        isEdit.value = false
        isDelete.value = true
        userId.value = data.val._id
    }
}

const handleCurrentChange = (val) => {
    store.dispatch("auth/usersPaginate", val)
}

const deleteUser = () => {
    editModal.value = !editModal.value
    const id = userId.value
    store.dispatch("auth/deleteUser", id)
}

const editUser = () => {
    editModal.value = !editModal.value
    const form = {
        username: editUsername.value,
        name:editName.value,
        isAdmin: adminValue.value,
        id: userId.value,
        password: editPassword.value,
        email:editEmail.value
    }
    store.dispatch("auth/editUser", form)
}
</script>

<style>

</style>